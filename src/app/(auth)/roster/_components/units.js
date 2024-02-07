import { Unit } from './unit';

export function Units({ unit }) {
  const { subunits } = unit;

  return (
    <>
      <Unit unit={unit} />
      {subunits &&
        !!subunits.length &&
        subunits.map((subunit) => <Unit key={subunit.id} unit={subunit} />)}
    </>
  );
}
