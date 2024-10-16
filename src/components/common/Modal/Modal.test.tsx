import { render, screen, fireEvent } from '@testing-library/react';

import Modal from './Modal';

import { ModalProps } from '../interfaces/Modal.interface';

const setup = (props: ModalProps) => render(<Modal {...props} />);

const onCloseMock = jest.fn();

const props = {
  onClose: onCloseMock,
  children: <div>Pau Riquelme</div>,
};

describe('Modal', () => {
  it('should renders children and calls onClose when clicked outside the content container', () => {
    setup(props);

    expect(screen.getByText('Pau Riquelme')).toBeInTheDocument();

    const container = screen.getByTestId('modal-container');
    fireEvent.click(container);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should prevents onClose from being called when clicked inside the content container', () => {
    setup(props);

    const contentContainer = screen.getByTestId('content-container');
    fireEvent.click(contentContainer);

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
