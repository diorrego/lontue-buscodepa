export interface TextProps {
  className: string;
  children: React.ReactNode;
}

export interface TextsProps {
  variant:
    | 'body'
    | 'title'
    | 'subtitle'
    | 'highlight'
    | 'description'
    | 'paragraph';
  className: string;
  children: React.ReactNode;
}
