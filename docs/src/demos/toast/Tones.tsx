import { Button, ButtonList, toast } from 'officehut/react';

export default function Tones() {
  return (
    <ButtonList>
      <Button
        onClick={() =>
          toast({
            title: 'Room booked',
            message: '4B, Thu 10:00',
            color: 'success',
          })
        }
      >
        success
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Heads up',
            message: 'Payroll closes at 15:00 today',
            color: 'info',
          })
        }
      >
        info
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Receipt missing',
            message: 'Taxi on 2 Oct, 185.00',
            color: 'warning',
          })
        }
      >
        warning
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Upload failed',
            message: 'scan-0418.pdf is over 10 MB',
            color: 'danger',
            duration: 0,
          })
        }
      >
        danger
      </Button>
    </ButtonList>
  );
}
