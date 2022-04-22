import { EditedDocument } from '../localstorage'

/*export const initDocument: EditedDocument = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]*/

export const initDocument: EditedDocument = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Slate is a completely customizable framework for building rich text editors.',
      },
    ],
  },
  {
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            type: 'quote',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Slate is a completely customizable framework for building rich text editors.',
                  },
                ],
              },
              {
                type: 'paragraph',
                align: 'right',
                children: [
                  { text: '— ' },
                  {
                    type: 'link',
                    url: 'https://docs.slatejs.org/',
                    children: [{ text: 'docs.slatejs.org' }],
                  },
                ],
              },
            ],
          },
          {
            type: 'paragraph',
            children: [{ text: 'Simple text' }],
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    children: [
      {
        type: 'column',
        size: 4,
        children: [{ type: 'paragraph', children: [{ text: 'Four' }] }],
      },
      {
        type: 'column',
        size: 5,
        children: [{ type: 'paragraph', children: [{ text: 'Five' }] }],
      },
      {
        type: 'column',
        size: 3,
        children: [{ type: 'paragraph', children: [{ text: 'Three' }] }],
      },
    ],
  },
]

/*export const initDocument: EditedDocument = [
  {
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            type: 'block',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    children: [
      {
        type: 'column',
        size: 3,
        children: [
          {
            type: 'block',
            children: [
              {
                type: 'paragraph',
                children: [{ text: 'first', bold: true }],
              },
            ],
          },
        ],
      },
      {
        type: 'column',
        size: 5,
        children: [
          {
            type: 'block',
            children: [
              {
                type: 'paragraph',
                children: [{ text: 'second' }],
              },
            ],
          },
        ],
      },
      {
        type: 'column',
        size: 4,
        children: [
          {
            type: 'block',
            children: [
              {
                type: 'paragraph',
                children: [{ text: 'third', italic: true, bold: true }],
              },
            ],
          },
        ],
      },
    ],
  },
]
*/
