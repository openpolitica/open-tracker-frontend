import BillCard from 'components/BillCard';
// Testing purposes
import statusMap from 'components/BillCard/statusMap';

export default function Bills() {
  return Object.keys(statusMap).map(status => (
    <BillCard key={status} status={status} />
  ));
}
