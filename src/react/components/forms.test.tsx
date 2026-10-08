import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../tests/a11y.js';
import { Checkbox } from './Checkbox/index.js';
import { Field, Fieldset } from './Field/index.js';
import { Input } from './Input/index.js';
import { InputGroup } from './InputGroup/index.js';
import { Radio } from './Radio/index.js';
import { RadioGroup } from './RadioGroup/index.js';
import { Select } from './Select/index.js';
import { Switch } from './Switch/index.js';
import { Textarea } from './Textarea/index.js';

describe('Field', () => {
  it('labels the control and links hint, remark and error', () => {
    render(
      <Field
        label='Amount'
        hint='Including VAT.'
        remark='Check with Mona'
        error='Enter an amount.'
        required
      >
        <Input inputMode='decimal' />
      </Field>,
    );
    const input = screen.getByRole('textbox', { name: 'Amount' });
    expect(input).toBeRequired();
    expect(input).toBeInvalid();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('input', 'is-invalid');
    expect(input).toHaveAccessibleDescription(
      'Enter an amount. Including VAT. Check with Mona',
    );
    // error is announced before the hint
    const ids = input.getAttribute('aria-describedby')!.split(' ');
    expect(document.getElementById(ids[0]!)).toHaveClass('field-error');
  });

  it('uses the given id and leaves a clean control when there is nothing to describe', () => {
    render(
      <Field label='Vendor' id='vendor'>
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText('Vendor');
    expect(input).toHaveAttribute('id', 'vendor');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input.className).toBe('input');
  });

  it('own props win over the Field', () => {
    render(
      <Field label='Cost centre' id='cc' error='Required' disabled>
        <Input aria-describedby='extra' invalid={false} disabled={false} />
      </Field>,
    );
    const input = screen.getByLabelText('Cost centre');
    expect(input).toBeEnabled();
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input.getAttribute('aria-describedby')).toBe('extra cc-error');
  });

  it('wires Select, Textarea, Checkbox and Switch too', () => {
    render(
      <>
        <Field label='Category' hint='Pick the closest.'>
          <Select placeholder='Choose…' options={['Travel', 'Meals']} />
        </Field>
        <Field label='Purpose' error='Too short'>
          <Textarea />
        </Field>
        <Field error='Please confirm'>
          <Checkbox>Receipts are attached</Checkbox>
        </Field>
        <Field hint='Applies at once'>
          <Switch>Email me approvals</Switch>
        </Field>
      </>,
    );
    expect(
      screen.getByRole('combobox', { name: 'Category' }),
    ).toHaveAccessibleDescription('Pick the closest.');
    expect(screen.getByRole('textbox', { name: 'Purpose' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(
      screen.getByRole('checkbox', { name: 'Receipts are attached' }),
    ).toHaveAccessibleDescription('Please confirm');
    expect(
      screen.getByRole('switch', { name: 'Email me approvals' }),
    ).toHaveAccessibleDescription('Applies at once');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <form>
        <Fieldset legend='Claim'>
          <Field label='Merchant' hint='As printed on the receipt.'>
            <Input />
          </Field>
          <Field label='Amount' error='Enter an amount.' required>
            <Input inputMode='decimal' />
          </Field>
          <Field label='Category'>
            <Select placeholder='Choose…' options={['Travel', 'Meals']} />
          </Field>
          <Field label='Signature'>
            <Input variant='signature' />
          </Field>
        </Fieldset>
      </form>,
    );
    await expectNoA11yViolations(container);
  });
});

describe('Input', () => {
  it('builds classes from props and forwards ref', () => {
    let node: HTMLInputElement | null = null;
    render(
      <Input
        aria-label='Signed'
        size='lg'
        variant='signature'
        valid
        className='x'
        ref={(n: HTMLInputElement | null) => void (node = n)}
      />,
    );
    expect(screen.getByRole('textbox').className).toBe(
      'input input-lg input-line input-signature is-valid x',
    );
    expect(node).toBeInstanceOf(HTMLInputElement);
  });

  it('works uncontrolled and controlled', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [v, setV] = useState('');
      return (
        <>
          <Input
            aria-label='Controlled'
            value={v}
            onChange={(e) => setV(e.target.value.toUpperCase())}
          />
          <output>{v}</output>
        </>
      );
    }
    render(
      <>
        <Input aria-label='Free' defaultValue='INV-' />
        <Controlled />
      </>,
    );
    await user.type(screen.getByLabelText('Free'), '2041');
    expect(screen.getByLabelText('Free')).toHaveValue('INV-2041');
    await user.type(screen.getByLabelText('Controlled'), 'egp');
    expect(screen.getByLabelText('Controlled')).toHaveValue('EGP');
    expect(screen.getByRole('status')).toHaveTextContent('EGP');
  });

  it('icon wraps it in .input-icon with a decorative addon', () => {
    const { container } = render(<Input aria-label='Search' icon={<svg />} />);
    expect(container.firstElementChild).toHaveClass('input-icon');
    expect(container.querySelector('.input-icon-addon')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});

describe('Select', () => {
  it('renders a placeholder and option shorthands', async () => {
    const onChange = vi.fn();
    render(
      <Select
        aria-label='Room'
        placeholder='Choose a room'
        options={[
          '4B',
          { value: '5A', label: 'Room 5A (12 seats)' },
          { value: '6C', disabled: true },
        ]}
        onChange={onChange}
      />,
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('');
    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(screen.getByRole('option', { name: '6C' })).toBeDisabled();
    await userEvent.selectOptions(select, '5A');
    expect(select).toHaveValue('5A');
    expect(onChange).toHaveBeenCalledOnce();
  });
});

describe('Checkbox', () => {
  it('labels the input and links the hint', () => {
    render(
      <Checkbox
        hint='We send it to your work email.'
        color='success'
        className='wrap'
      >
        Send me a copy
      </Checkbox>,
    );
    const box = screen.getByRole('checkbox', { name: 'Send me a copy' });
    expect(box).toHaveAccessibleDescription('We send it to your work email.');
    expect(box.parentElement).toHaveClass('check', 'check-success', 'wrap');
    expect(box).toHaveClass('check-input');
  });

  it('sets indeterminate via the DOM property and keeps the user ref', () => {
    let node: HTMLInputElement | null = null;
    const { rerender } = render(
      <Checkbox
        indeterminate
        ref={(n: HTMLInputElement | null) => void (node = n)}
      >
        All timesheets
      </Checkbox>,
    );
    const box = screen.getByRole('checkbox');
    expect(box).toBePartiallyChecked();
    expect(node).toBe(box);
    rerender(<Checkbox indeterminate={false}>All timesheets</Checkbox>);
    expect((box as HTMLInputElement).indeterminate).toBe(false);
  });

  it('select-all pattern stays in sync', async () => {
    const user = userEvent.setup();
    function SelectAll() {
      const [picked, setPicked] = useState(['Mon']);
      const days = ['Mon', 'Tue'];
      const all = picked.length === days.length;
      return (
        <>
          <Checkbox
            checked={all}
            indeterminate={picked.length > 0 && !all}
            onChange={() => setPicked(all ? [] : days)}
          >
            Whole week
          </Checkbox>
          {days.map((d) => (
            <Checkbox
              key={d}
              checked={picked.includes(d)}
              onChange={(e) =>
                setPicked((p) =>
                  e.target.checked ? [...p, d] : p.filter((x) => x !== d),
                )
              }
            >
              {d}
            </Checkbox>
          ))}
        </>
      );
    }
    render(<SelectAll />);
    const week = screen.getByRole('checkbox', { name: 'Whole week' });
    expect(week).toBePartiallyChecked();
    await user.click(week);
    expect(week).toBeChecked();
    expect(week).not.toBePartiallyChecked();
    await user.click(screen.getByRole('checkbox', { name: 'Tue' }));
    expect(week).toBePartiallyChecked();
  });

  it('card variant and axe', async () => {
    const { container } = render(
      <Checkbox
        card
        aside='EGP 450'
        hint='Two nights, breakfast included.'
        defaultChecked
      >
        Hotel
      </Checkbox>,
    );
    expect(
      container.querySelector('.check.check-card .check-card-aside'),
    ).toHaveTextContent('EGP 450');
    await expectNoA11yViolations(container);
  });
});

describe('RadioGroup', () => {
  it('names the group, shares a name and stays native', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup
        label='Leave type'
        defaultValue='annual'
        onChange={onChange}
        hint='Sick leave needs a note.'
      >
        <Radio value='annual'>Annual</Radio>
        <Radio value='sick'>Sick</Radio>
        <Radio value='unpaid'>Unpaid</Radio>
      </RadioGroup>,
    );
    const group = screen.getByRole('radiogroup', { name: 'Leave type' });
    expect(group).toHaveAccessibleDescription('Sick leave needs a note.');
    const radios = screen.getAllByRole('radio');
    const name = radios[0]!.getAttribute('name');
    expect(name).toBeTruthy();
    radios.forEach((r) => expect(r).toHaveAttribute('name', name));
    expect(screen.getByRole('radio', { name: 'Annual' })).toBeChecked();

    await user.click(screen.getByRole('radio', { name: 'Sick' }));
    expect(screen.getByRole('radio', { name: 'Sick' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Annual' })).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith('sick', expect.anything());
    // no roving-tabindex JS: every radio is a plain input with no tabindex
    radios.forEach((r) => expect(r).not.toHaveAttribute('tabindex'));
  });

  it('controlled value wins', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [v, setV] = useState('4B');
      return (
        <RadioGroup label='Room' value={v} onChange={setV} inline>
          <Radio value='4B'>4B</Radio>
          <Radio value='5A'>5A</Radio>
        </RadioGroup>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole('radio', { name: '5A' }));
    expect(screen.getByRole('radio', { name: '5A' })).toBeChecked();
    expect(screen.getByRole('radiogroup')).toHaveClass(
      'check-group',
      'check-group-inline',
    );
  });

  it('error marks the group invalid and required flows to radios', async () => {
    const { container } = render(
      <RadioGroup label='Meal' error='Choose one.' required>
        <Radio value='veg'>Vegetarian</Radio>
        <Radio value='std'>Standard</Radio>
      </RadioGroup>,
    );
    const group = screen.getByRole('radiogroup', { name: 'Meal' });
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAccessibleDescription('Choose one.');
    screen.getAllByRole('radio').forEach((r) => {
      expect(r).toBeRequired();
      expect(r).toHaveClass('is-invalid');
    });
    await expectNoA11yViolations(container);
  });
});

describe('Switch', () => {
  it('is a checkbox with role switch and toggles', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Switch io reverse color='success' onChange={onChange}>
        Out of office
      </Switch>,
    );
    const sw = screen.getByRole('switch', { name: 'Out of office' });
    expect(sw).toHaveAttribute('type', 'checkbox');
    expect(sw).not.toBeChecked();
    sw.focus();
    await user.keyboard(' ');
    expect(sw).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
    expect(sw.parentElement).toHaveClass(
      'switch',
      'switch-success',
      'switch-reverse',
      'switch-io',
    );
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Switch defaultChecked hint='Colleagues see this on your profile.'>
        Show my desk number
      </Switch>,
    );
    await expectNoA11yViolations(container);
  });
});

describe('InputGroup', () => {
  it('joins addon, input and size', async () => {
    const { container } = render(
      <Field label='Total'>
        <InputGroup size='sm'>
          <InputGroup.Text>EGP</InputGroup.Text>
          <Input inputMode='decimal' />
        </InputGroup>
      </Field>,
    );
    expect(
      container.querySelector(
        '.input-group.input-group-sm > .input-group-text',
      ),
    ).toHaveTextContent('EGP');
    expect(screen.getByRole('textbox', { name: 'Total' })).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });
});
