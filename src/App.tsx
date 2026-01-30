import ParamEditor from './components/ParamEditor';

function App() {
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

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>Редактор параметров</h1>
      <ParamEditor params={params} model={model} />
    </div>
  );
}

export default App;
