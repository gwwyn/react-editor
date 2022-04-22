import React from 'react'
import { RenderElementProps } from 'slate-react'
import { LinkNode, ParagraphNode, QuoteNode } from '../types'
import { ColumnElement, RowElement } from './Columns'
import './Elements.scss'

function QuoteElement({ element, attributes, children }: RenderElementProps) {
  const { creditnails } = element as QuoteNode
  return (
    <blockquote className='quote' {...attributes}>
      {creditnails && (
        <div className='quote-title'>
          <div>
            <a href={`#/${creditnails.post}`}>{`#${creditnails.post}`}</a>{' '}
          </div>
          <div>
            <a href={`/user/${creditnails.userid}`}>{creditnails.author}</a>{' '}
            wrote:
          </div>
        </div>
      )}
      <div className='quote-content'>{children}</div>
    </blockquote>
  )
}

const Element = (props: RenderElementProps) => {
  const { element, attributes, children } = props

  switch (element.type) {
    case 'row':
      return <RowElement {...props} />
    case 'column':
      return <ColumnElement {...props} />
    case 'quote':
      return <QuoteElement {...props} />
    case 'paragraph':
      return (
        <p
          style={{ textAlign: (props.element as ParagraphNode).align }}
          {...attributes}>
          {children}
        </p>
      )
    case 'link':
      return <a href={(props.element as LinkNode).url}>{children}</a>
    default:
      return (
        <span className='empty' {...attributes}>
          {children}
        </span>
      )
  }
}

export default Element
