export interface AvatarProps {
  avatar?: string; // the "avatar" is optional, otherwise the "label" will be used to render the component.
  label: string; // prop strict and necessary to render the component.
  dropShadow?: boolean; // prop to style drop-shadow when the element is occupied on live backgrounds.
  className?: string; // prop created to maintain element size within flex or grid components (example className="flex-none").
}
