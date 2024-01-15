import { TabItem } from 'flowbite-react';
import { Alert } from '../../../components/alert';
import { Card } from '../../../components/card';
import { Tabs } from '../../../components/tabs';
import Client from '../../../lib/client';
import { RequestError } from '../../../lib/request-error';
import { Units } from './_components/units';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Roster'
};

export default async function Page() {
  let groups = {};
  try {
    groups = await new Client().getGroups();
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  return (
    <Card>
      <Tabs style="underline">
        {groups.data &&
          !!groups.data.length &&
          groups.data.map((group, index) => (
            <TabItem key={index} title={group.name}>
              <>
                {group.units && !!group.units.length ? (
                  group.units.map((unit) => {
                    return <Units key={unit.id} unit={unit} />;
                  })
                ) : (
                  <div className="flex items-center justify-center p-8 text-sm">
                    There are no units assigned to this group.
                  </div>
                )}
              </>
            </TabItem>
          ))}
      </Tabs>
    </Card>
  );
}
