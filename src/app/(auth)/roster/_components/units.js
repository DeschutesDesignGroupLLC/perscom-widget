import { Unit } from './unit';

export function Units({ unit }) {
  const { units } = unit;

  return (
    <>
      <Unit unit={unit} />
      {units && !!units.length && units.map((subunit) => <Unit key={subunit.id} unit={subunit} />)}
    </>
  );
}
