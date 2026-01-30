import React, { Component } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: this.initializeParamValues(
        props.params,
        props.model.paramValues,
      ),
    };
  }

  private initializeParamValues = (
    params: Param[],
    paramValues: ParamValue[],
  ): ParamValue[] => {
    return params.map((param) => {
      const existing = paramValues.find((pv) => pv.paramId === param.id);
      return existing || { paramId: param.id, value: '' };
    });
  };

  private handleParamChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((pv) =>
        pv.paramId === paramId ? { ...pv, value } : pv,
      ),
    }));
  };

  public getModel(): Model {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors,
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div
        style={{
          maxWidth: '400px',
          margin: '20px auto',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Редактор параметров</h2>
        {params.map((param) => {
          const paramValue = paramValues.find((pv) => pv.paramId === param.id);

          return (
            <div key={param.id} style={{ marginBottom: '16px' }}>
              <label
                htmlFor={`param-${param.id}`}
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
              >
                {param.name}:
              </label>
              <input
                id={`param-${param.id}`}
                type="text"
                value={paramValue?.value || ''}
                onChange={(e) =>
                  this.handleParamChange(param.id, e.target.value)
                }
                style={{
                  width: '100%',
                  padding: '8px 5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

// пример использования в проекте
export const DemoApp: React.FC = () => {
  const editorRef = React.useRef<ParamEditor>(null);

  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  const handleGetModel = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      console.log('Текущая модель:', model);
      alert(JSON.stringify(model, null, 2));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button
        onClick={handleGetModel}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Получить модель
      </button>
    </div>
  );
};

export default ParamEditor;
