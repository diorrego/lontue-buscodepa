import PageTitle from './components/PageTitle';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import SectionTitle from './components/SectionTitle';
import Paragraph from './components/Paragraph';
import Label from './components/Label';
import Description from './components/Description';

import { TextProps } from './Text.interface';

const Text = ({ variant = 'paragraph', className, children }: TextProps) => {
  const variants = {
    pageTitle: PageTitle,
    title: Title,
    subtitle: Subtitle,
    sectionTitle: SectionTitle,
    paragraph: Paragraph,
    label: Label,
    description: Description,
  };

  const Variant = variants[variant] || variants.paragraph;

  return <Variant className={className}>{children}</Variant>;
};

export default Text;
