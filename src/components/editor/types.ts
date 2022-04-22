import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type Content = RowNode[]

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

// Rows & columns

export type RowNode = {
  type: 'row'
  children: CustomElement[]
}

export type ColumnNode = {
  type: 'column'
  size?: number
  merge?: boolean
  children: BlockElement[]
}

// Block elements

export type MoreNode = {
  type: 'more'
  isOpen: boolean
  children: BlockElement[]
}

export type QuoteNode = {
  type: 'quote'
  creditnails?: {
    userid: number
    author: number
    post: number
  }
  children: BlockElement[]
}

export type AlignTypes = 'left' | 'right' | 'center'
export type ParagraphNode = {
  type: 'paragraph'
  align?: AlignTypes
  children: Array<InlineElement | CustomText>
}

// Inline elements

type MentionNode = {
  type: 'mention'
  kind: 'user' | 'character'
  children: CustomText[]
}

export type LinkNode = {
  type: 'link'
  url: string
  children: CustomText[]
}

export type BlockElement = ParagraphNode | MoreNode | QuoteNode
export type InlineElement = MentionNode | LinkNode
export type CustomElement = RowNode | ColumnNode | BlockElement | InlineElement

export type FormattedText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
}

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
