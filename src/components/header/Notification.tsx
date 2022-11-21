import Lottie from 'ui/Lottie';
import Dropdown, { DropdownItem } from 'ui/Dropdown';
import Button from 'ui/Button';
import Bell from 'icons/Bell';

const Notification = () => {
  return (
    <Dropdown
      trigger={
        <Button className="notification" variant="ghost">
          <span className="badge">2</span>
          <Lottie
            path="https://assets9.lottiefiles.com/packages/lf20_0skurerf.json
"
            fallBack={<Bell />}
            className="bell"
          />
        </Button>
      }
    >
      <DropdownItem>hi</DropdownItem>
    </Dropdown>
  );
};

export default Notification;
