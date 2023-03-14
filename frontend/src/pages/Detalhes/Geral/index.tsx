import stylesTema from 'styles/Tema.module.scss';
import InputMask from "react-input-mask";

interface Props {
  nomeCompleto: string
  setNomeCompleto: React.Dispatch<React.SetStateAction<string>>
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  phone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>
  cpf_cnpj: number
  setCpf_cnpj: React.Dispatch<React.SetStateAction<number>>
  date_birth: string
  setDate_birth: React.Dispatch<React.SetStateAction<string>>
}

export default function Geral({
  nomeCompleto,
  setNomeCompleto,
  email,
  setEmail,
  phone,
  setPhone,
  cpf_cnpj,
  setCpf_cnpj,
  date_birth,
  setDate_birth,
}: Props) {
  return (
    <>
      <div className={stylesTema.container__titulo}>
        <h3>Geral</h3>
      </div>
      <div className={stylesTema.grupoInputs}>
        <div className={stylesTema.grupoInputs__coluna}>
          <input
            type='text'
            id='firstname'
            name='firstname'
            placeholder='Nome completo'
            value={nomeCompleto}
            onChange={e => setNomeCompleto(e.target.value)}
          />
          <input
            type='text'
            id='email'
            name='email'
            placeholder='E-mail'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

        </div>

        <div className={stylesTema.grupoInputs__coluna}>
          <input
            type='text'
            id='phone'
            name='phone'
            placeholder='Telefone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <input
            type='number'
            id='cpf_cnpj'
            name='cpf_cnpj'
            placeholder='CPF/CNPJ'
            value={cpf_cnpj ? cpf_cnpj : ''}
            onChange={e => setCpf_cnpj(Number(e.target.value))}
          />

          <InputMask
            mask="99/99/9999"
            maskChar="_"
            type="text"
            id="date_birth"
            name="date_birth"
            placeholder="Data de nascimento"
            value={date_birth}
            onChange={e => setDate_birth(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}