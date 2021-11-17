import { ZERO } from "../../dataset/constant/Common"
import { IDrawOption } from "../../interface/Draw"
import { IEditorOption } from "../../interface/Editor"
import { IElement, IElementPosition, IElementStyle } from "../../interface/Element"
import { IRow } from "../../interface/Row"
import { deepClone } from "../../utils"
import { Cursor } from "../cursor/Cursor"
import { CanvasEvent } from "../event/CanvasEvent"
import { GlobalEvent } from "../event/GlobalEvent"
import { HistoryManager } from "../history/HistoryManager"
import { Position } from "../position/Position"
import { RangeManager } from "../range/RangeManager"
import { Background } from "./Background"
import { Margin } from "./Margin"
import { Search } from "./Search"

export class Draw {

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private options: Required<IEditorOption>
  private position: Position
  private elementList: IElement[]

  private cursor: Cursor
  private range: RangeManager
  private margin: Margin
  private background: Background
  private search: Search
  private historyManager: HistoryManager

  private rowCount: number
  private painterStyle: IElementStyle | null
  private searchMatchList: number[][] | null

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, options: Required<IEditorOption>, elementList: IElement[]) {
    this.canvas = canvas
    this.ctx = ctx
    this.options = options
    this.elementList = elementList

    this.historyManager = new HistoryManager()
    this.position = new Position(this)
    this.range = new RangeManager(ctx, options, this)
    this.margin = new Margin(ctx, options)
    this.background = new Background(ctx)
    this.search = new Search(ctx, options, this)

    const canvasEvent = new CanvasEvent(canvas, this)
    this.cursor = new Cursor(canvas, this, canvasEvent)
    canvasEvent.register()
    const globalEvent = new GlobalEvent(canvas, this, canvasEvent)
    globalEvent.register()

    this.rowCount = 0
    this.painterStyle = null
    this.searchMatchList = null
  }

  public getOptions(): Required<IEditorOption> {
    return this.options
  }

  public getHistoryManager(): HistoryManager {
    return this.historyManager
  }

  public getPosition(): Position {
    return this.position
  }

  public getRange(): RangeManager {
    return this.range
  }

  public getElementList(): IElement[] {
    return this.elementList
  }

  public getCursor(): Cursor {
    return this.cursor
  }

  public getRowCount(): number {
    return this.rowCount
  }

  public getDataURL(): string {
    return this.canvas.toDataURL()
  }

  public getPainterStyle(): IElementStyle | null {
    return this.painterStyle && Object.keys(this.painterStyle).length ? this.painterStyle : null
  }

  public setPainterStyle(payload: IElementStyle | null) {
    this.painterStyle = payload
    if (this.getPainterStyle()) {
      this.canvas.style.cursor = 'copy'
    }
  }

  public getSearchMathch(): number[][] | null {
    return this.searchMatchList
  }

  public setSearchMatch(payload: number[][] | null) {
    this.searchMatchList = payload
  }

  public render(payload?: IDrawOption) {
    let { curIndex, isSubmitHistory = true, isSetCursor = true } = payload || {}
    // 清除光标
    this.cursor.recoveryCursor()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.position.setPositionList([])
    const positionList = this.position.getPositionList()
    // 基础信息
    const { defaultSize, defaultFont } = this.options
    const canvasRect = this.canvas.getBoundingClientRect()
    // 绘制背景
    this.background.render(canvasRect)
    // 绘制页边距
    const { width } = canvasRect
    const { margins } = this.options
    const leftTopPoint: [number, number] = [margins[3], margins[0]]
    const rightTopPoint: [number, number] = [width - margins[1], margins[0]]
    this.margin.render(canvasRect)
    // 计算行信息
    const rowList: IRow[] = []
    if (this.elementList.length) {
      rowList.push({
        width: 0,
        height: 0,
        ascent: 0,
        elementList: []
      })
    }
    for (let i = 0; i < this.elementList.length; i++) {
      this.ctx.save()
      const curRow: IRow = rowList[rowList.length - 1]
      const element = this.elementList[i]
      this.ctx.font = `${element.bold ? 'bold ' : ''}${element.size || defaultSize}px ${element.font || defaultFont}`
      const metrics = this.ctx.measureText(element.value)
      const width = metrics.width
      const fontBoundingBoxAscent = metrics.fontBoundingBoxAscent
      const fontBoundingBoxDescent = metrics.fontBoundingBoxDescent
      const height = fontBoundingBoxAscent + fontBoundingBoxDescent
      const lineText = { ...element, metrics }
      if (curRow.width + width > rightTopPoint[0] - leftTopPoint[0] || (i !== 0 && element.value === ZERO)) {
        rowList.push({
          width,
          height: this.options.defaultSize,
          elementList: [lineText],
          ascent: fontBoundingBoxAscent
        })
      } else {
        curRow.width += width
        if (curRow.height < height) {
          curRow.height = height
          curRow.ascent = fontBoundingBoxAscent
        }
        curRow.elementList.push(lineText)
      }
      this.ctx.restore()
    }
    // 渲染元素
    let x = leftTopPoint[0]
    let y = leftTopPoint[1]
    let index = 0
    for (let i = 0; i < rowList.length; i++) {
      const curRow = rowList[i];
      for (let j = 0; j < curRow.elementList.length; j++) {
        this.ctx.save()
        const element = curRow.elementList[j]
        const metrics = element.metrics
        this.ctx.font = `${element.bold ? 'bold ' : ''}${element.size || defaultSize}px ${element.font || defaultFont}`
        if (element.color) {
          this.ctx.fillStyle = element.color
        }
        const positionItem: IElementPosition = {
          index,
          value: element.value,
          rowNo: i,
          metrics,
          ascent: curRow.ascent,
          lineHeight: curRow.height,
          isLastLetter: j === curRow.elementList.length - 1,
          coordinate: {
            leftTop: [x, y],
            leftBottom: [x, y + curRow.height],
            rightTop: [x + metrics.width, y],
            rightBottom: [x + metrics.width, y + curRow.height]
          }
        }
        positionList.push(positionItem)
        this.ctx.fillText(element.value, x, y + curRow.ascent)
        // 选区绘制
        const { startIndex, endIndex } = this.range.getRange()
        if (startIndex < index && index <= endIndex) {
          this.range.drawRange(x, y, metrics.width, curRow.height)
        }
        index++
        x += metrics.width
        this.ctx.restore()
      }
      x = leftTopPoint[0]
      y += curRow.height
    }
    // 搜索匹配绘制
    if (this.searchMatchList) {
      this.search.render()
    }
    // 光标重绘
    if (curIndex === undefined) {
      curIndex = positionList.length - 1
    }
    if (isSetCursor) {
      this.position.setCursorPosition(positionList[curIndex!] || null)
      this.cursor.drawCursor()
    }
    // canvas高度自适应计算
    const lastPosition = positionList[positionList.length - 1]
    const { coordinate: { leftBottom, leftTop } } = lastPosition
    if (leftBottom[1] > this.canvas.height) {
      const height = Math.ceil(leftBottom[1] + (leftBottom[1] - leftTop[1]))
      this.canvas.height = height
      this.canvas.style.height = `${height}px`
      this.render({ curIndex, isSubmitHistory: false })
    }
    this.rowCount = rowList.length
    // 历史记录用于undo、redo
    if (isSubmitHistory) {
      const self = this
      const oldElementList = deepClone(this.elementList)
      this.historyManager.execute(function () {
        self.elementList = deepClone(oldElementList)
        self.render({ curIndex, isSubmitHistory: false })
      })
    }
  }

}