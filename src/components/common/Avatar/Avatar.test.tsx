import { render, screen } from '@testing-library/react';

import Avatar from './Avatar';

import { AvatarProps } from '../interfaces/Avatar.interface';

const setup = (props: AvatarProps) => render(<Avatar {...props} />);

describe('Avatar component', () => {
  it('should render with image', () => {
    const props = {
      avatar: 'http://localhost/public/yellowStar.png',
      label: 'Pau Riquelme',
    };

    setup(props);

    const image = screen.getByAltText(props.label) as HTMLImageElement;
    expect(image.src).toBe(props.avatar);
  });

  it('should render with text', () => {
    const props = {
      label: 'Pau Riquelme',
    };

    setup(props);

    const text = screen.getByText(props.label.charAt(0).toUpperCase());
    expect(text).toBeInTheDocument();
  });
});
