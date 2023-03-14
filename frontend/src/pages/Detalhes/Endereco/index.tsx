import stylesTema from 'styles/Tema.module.scss';

interface Props {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export default function Endereco({
  address,
  setAddress
}: Props) {
  return (
    <>
      <div className={stylesTema.container__titulo}>
        <h3>Endereço</h3>
      </div>
      <div className={stylesTema.grupoInputs}>
        <div className={stylesTema.grupoInputs__coluna}>
          <input
            type='text'
            id='street'
            name='street'
            placeholder='Endereço completo'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className={stylesTema.grupoInputs__coluna}>
        </div>
      </div>
    </>
  );
}