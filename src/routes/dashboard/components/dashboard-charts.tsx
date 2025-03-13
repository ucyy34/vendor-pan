import {
  CalendarMini,
  TriangleRightMini,
} from '@medusajs/icons';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Badge,
  Button,
  Container,
  DateRange,
  Heading,
  Popover,
  Text,
} from '@medusajs/ui';
import { Link } from 'react-router-dom';
import { useStatistics } from '../../../hooks/api';
import { ChartSkeleton } from './chart-skeleton';
import { useState } from 'react';
import { addDays, format, subDays } from 'date-fns';
import { Calendar } from '../../../components/common/calendar/calendar';

const colorPicker = (line: string) => {
  switch (line) {
    case 'customers':
      return '#2563eb';
    case 'orders':
      return '#60a5fa';
    default:
      return '';
  }
};

export const DashboardCharts = () => {
  const [filters, setFilters] = useState([
    'customers',
    'orders',
  ]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const { customers, orders, isPending } = useStatistics({
    from: `${format(subDays(new Date(), 7), 'yyyy-MM-dd')}`,
    to: `${format(new Date(), 'yyyy-MM-dd')}`,
  });

  const chartData = [
    { date: '2025-03-05', orders: 1, customers: 10 },
    { date: '2025-03-06', orders: 2, customers: 1 },
    { date: '2025-03-07', orders: 8, customers: 4 },
    { date: '2025-03-08', orders: 3, customers: 6 },
    { date: '2025-03-09', orders: 5, customers: 9 },
    { date: '2025-03-10', orders: 10, customers: 10 },
    { date: '2025-03-11', orders: 7, customers: 8 },
  ];

  const totals = chartData.reduce(
    (acc, curr) => {
      return {
        orders: acc.orders + curr.orders,
        customers: acc.customers + curr.customers,
      };
    },
    { orders: 0, customers: 0 }
  ); // Inicjalizujemy wartości od 0

  const handleFilter = (label: string) => {
    if (filters.find((item) => item === label)) {
      setFilters(filters.filter((item) => item !== label));
    } else {
      setFilters([...filters, label]);
    }
  };

  return (
    <>
      <Container className='divide-y p-0'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div>
            <Heading>Actions</Heading>
            <Text
              className='text-ui-fg-subtle'
              size='small'
            >
              Check out new events and manage your store
            </Text>
          </div>
        </div>
        <div className='px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          <Link to='/requests/collections'>
            <Button
              variant='secondary'
              className='w-full justify-between py-4'
            >
              <div className='flex gap-4 items-center'>
                <Badge>0</Badge>
                Orders to be fulfilled
              </div>
              <TriangleRightMini color='grey' />
            </Button>
          </Link>
          <Link to='/requests/collections'>
            <Button
              variant='secondary'
              className='w-full justify-between py-4'
            >
              <div className='flex gap-4 items-center'>
                <Badge>0</Badge>
                Orders to be shipped
              </div>
              <TriangleRightMini color='grey' />
            </Button>
          </Link>
          <Link to='/requests/collections'>
            <Button
              variant='secondary'
              className='w-full justify-between py-4'
            >
              <div className='flex gap-4 items-center'>
                <Badge>0</Badge>
                New reviews
              </div>
              <TriangleRightMini color='grey' />
            </Button>
          </Link>
          <Link to='/messages'>
            <Button
              variant='secondary'
              className='w-full justify-between py-4 h-[48px]'
            >
              <div className='flex gap-4 items-center'>
                Messages
              </div>
              <TriangleRightMini color='grey' />
            </Button>
          </Link>
        </div>
      </Container>
      <Container className='divide-y p-0 mt-2'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div>
            <Heading>Analytics</Heading>
            <Text
              className='text-ui-fg-subtle'
              size='small'
            >
              See your store's progress
            </Text>
          </div>
          <div>
            <Popover>
              <Popover.Trigger>
                <Button variant='secondary'>
                  <CalendarMini />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <Calendar
                  mode='range'
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  defaultMonth={date?.from}
                />
              </Popover.Content>
            </Popover>
          </div>
        </div>
        <div className='relative px-6 py-4 grid grid-cols-1 lg:grid-cols-4 gap-4'>
          <div className='col-span-3 relative h-[150px] md:h-[300px] w-[calc(100%-2rem)]'>
            {isPending ? (
              <ChartSkeleton />
            ) : (
              <ResponsiveContainer
                width='100%'
                height='100%'
              >
                <LineChart data={chartData}>
                  <XAxis dataKey='date' />
                  <YAxis />
                  <CartesianGrid
                    stroke='#333'
                    vertical={false}
                  />
                  {filters.map((item) => (
                    <Line
                      key={item}
                      type='monotone'
                      dataKey={item}
                      stroke={colorPicker(item)}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:block gap-4'>
            {isPending ? (
              <ChartSkeleton />
            ) : (
              <>
                <Button
                  variant='secondary'
                  className='p-4 border rounded-lg w-full flex-col items-start my-2'
                  onClick={() => handleFilter('orders')}
                >
                  <Heading level='h3'>Orders</Heading>
                  <div className='flex gap-2 items-center mt-2'>
                    <div
                      className='h-8 w-1'
                      style={{
                        backgroundColor: filters.find(
                          (item) => item === 'orders'
                        )
                          ? colorPicker('orders')
                          : 'gray',
                      }}
                    />
                    <Text className='text-ui-fg-subtle'>
                      {/* {orders.length} */}
                      {totals.orders}
                    </Text>
                  </div>
                </Button>
                <Button
                  variant='secondary'
                  className='p-4 border rounded-lg w-full flex-col items-start my-2'
                  onClick={() => handleFilter('customers')}
                >
                  <Heading level='h3'>Customers</Heading>
                  <div className='flex gap-2 items-center mt-2'>
                    <div
                      className='h-8 w-1'
                      style={{
                        backgroundColor: filters.find(
                          (item) => item === 'customers'
                        )
                          ? colorPicker('customers')
                          : 'gray',
                      }}
                    />
                    <Text className='text-ui-fg-subtle'>
                      {/* {customers.length} */}
                      {totals.customers}
                    </Text>
                  </div>
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
