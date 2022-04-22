import React from 'react'
import Bold from './icons/bold.svg'
import Italic from './icons/italic.svg'
import Underline from './icons/underline.svg'
import Strikethrough from './icons/strikethrough.svg'
import Link from './icons/link.svg'
import Unlink from './icons/unlink.svg'
import Left from './icons/align-left.svg'
import Right from './icons/align-right.svg'
import Center from './icons/align-center.svg'
import Quote from './icons/quote.svg'
import More from './icons/more.svg'
import Code from './icons/code.svg'
import Mention from './icons/mention.svg'
import Paragraph from './icons/paragraph.svg'
import Image from './icons/image.svg'
import Gallery from './icons/gallery.svg'
import Media from './icons/media.svg'
import Table from './icons/table.svg'
import AddColumn from './icons/add-column.svg'
import DelColumn from './icons/del-column.svg'
import Help from './icons/help.svg'

export type IconTypes =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'link'
  | 'unlink'
  | 'left'
  | 'right'
  | 'center'
  | 'quote'
  | 'more'
  | 'code'
  | 'mention'
  | 'paragraph'
  | 'image'
  | 'gallery'
  | 'media'
  | 'table'
  | 'add-column'
  | 'remove-column'
  | 'help'

const icons = {
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strikethrough: Strikethrough,
  link: Link,
  unlink: Unlink,
  left: Left,
  right: Right,
  center: Center,
  quote: Quote,
  more: More,
  code: Code,
  mention: Mention,
  paragraph: Paragraph,
  image: Image,
  gallery: Gallery,
  media: Media,
  table: Table,
  'add-column': AddColumn,
  'remove-column': DelColumn,
  help: Help,
}

type IconProps = {
  icon: IconTypes
}

function Icon({ icon }: IconProps) {
  return <img src={icons[icon]} />
}

export default Icon
