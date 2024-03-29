import { Table as FlowbiteTable } from 'flowbite-react';

export function Table(props) {
  return (
    <FlowbiteTable
      {...(({ children, ...o }) => o)(props)}
      theme={{
        root: {
          shadow: 'absolute bg-white dark:bg-gray-800 w-full h-full top-0 left-0 rounded-lg -z-10'
        }
      }}
    >
      {props.children}
    </FlowbiteTable>
  );
}
