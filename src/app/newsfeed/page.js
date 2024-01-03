import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Auth from '../../api/auth';
import Client from '../../api/client';
import { Card } from '../../components/card';
import { Pagination } from '../../components/pagination';
import { Table } from '../../components/table';
import { Item } from './_components/item';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Newsfeed'
};

export default async function Page({ searchParams }) {
  const auth = new Auth(searchParams);
  const newsfeed = await new Client(auth).getNewsfeed();

  return (
    <Card>
      <Table striped={false}>
        <TableHead className="text-center">
          <TableHeadCell>Newsfeed</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y divide-gray-200 dark:divide-gray-900">
          {newsfeed.data && !!newsfeed.data.length ? (
            newsfeed.data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Item item={item} currentUser={auth.getAuthIdentifier()} />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-sm">
              There are no newsfeed items to view.
            </div>
          )}
        </TableBody>
      </Table>
      <Pagination meta={newsfeed.meta} />
    </Card>
  );
}
