import { render, screen, fireEvent } from '@testing-library/react';
import ParamEditor from '../components/ParamEditor';

describe('ParamEditor', () => {
  const params = [
    { id: 1, name: 'Назначение', type: 'string' as const },
    { id: 2, name: 'Длина', type: 'string' as const },
  ];

  const model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  test('отображает все поля параметров', () => {
    render(<ParamEditor params={params} model={model} />);

    expect(screen.getByLabelText('Назначение:')).toBeInTheDocument();
    expect(screen.getByLabelText('Длина:')).toBeInTheDocument();
  });

  test('инициализирует значения из модели', () => {
    render(<ParamEditor params={params} model={model} />);

    const input1 = screen.getByLabelText('Назначение:') as HTMLInputElement;
    const input2 = screen.getByLabelText('Длина:') as HTMLInputElement;

    expect(input1.value).toBe('повседневное');
    expect(input2.value).toBe('макси');
  });

  test('изменяет значение при редактировании', () => {
    render(<ParamEditor params={params} model={model} />);

    const input = screen.getByLabelText('Назначение:') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'офисное' } });

    expect(input.value).toBe('офисное');
  });
});
