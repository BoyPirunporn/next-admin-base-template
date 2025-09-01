import Heading from '@/components/heading';
import { delay } from '@/lib/utils';

const page = async () => {
  await delay(2000)
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Heading title={'GetStarted'}/>
    </div>
  );
};

export default page;