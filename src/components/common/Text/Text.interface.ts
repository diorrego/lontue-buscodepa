export interface TextComponentProps {
  className?: string;
  children: React.ReactNode;
}

export interface TextProps {
  variant?:
    | 'pageTitle'
    | 'title'
    | 'subtitle'
    | 'sectionTitle'
    | 'paragraph'
    | 'label'
    | 'description';
  className?: string;
  children: React.ReactNode;
}
