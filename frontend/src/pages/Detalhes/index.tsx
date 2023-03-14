import React, { useState, useEffect, useCallback } from 'react';
import stylesTema from 'styles/Tema.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from 'types/IUser';
import axios from 'axios';
import Geral from './Geral';
import Endereco from './Endereco';
import PreLoader from 'components/PreLoader';

export default function Detalhes() {
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  const [usuario, setUsuario] = useState<IUser>();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [address, setAddress] = useState<string>('');

  const [phone, setPhone] = useState<string>('');

  const [cpf_cnpj, setCpf_cnpj] = useState<number>(0);

  const [date_birth, setDate_birth] = useState<string>('');


  const setarStatesUsuario = useCallback(() => {

    setUsername(usuario?.username ? usuario.username : '');
    setEmail(usuario?.email ? usuario.email : '');
    setPhone(usuario?.phone ? usuario.phone : '');
    setAddress(usuario?.address ? usuario.address : '');
    setCpf_cnpj(usuario?.cpf_cnpj ? usuario.cpf_cnpj : 0);
    setDate_birth(usuario?.date_birth ? usuario.date_birth : '');
  }, [usuario]);

  useEffect(() => {
    const getUser = async () => {
      axios.get<IUser>(`http://localhost:5000/users/${id}`)
        .then(r => {
          console.log(r);
          setUsuario(r.data);
          setLoading(false);
        })
        .catch(e => console.log(e))
    };

    if (id) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (usuario) {
      setarStatesUsuario();
    }
  }, [usuario, setarStatesUsuario]);

  const salvarUsuario = () => {
    const saveUser = async () => {
      let nome = username?.split(' ');

      if (!nome) {
        return;
      }

      const json = {
        email: email,
        username: username,
        address: address,
        phone: phone,
        cpf_cnpj: cpf_cnpj,
        date_birth: date_birth,
      };

      if (id) {
        axios.put(`http://localhost:5000/users/${id}`, json)
          .then(r => {
            console.log(r);

            navigate('/usuarios');
          })
          .catch(e => console.log(e))
      } else {
        axios.post('http://localhost:5000/users', json)
          .then(r => {
            console.log(r);

            navigate(`/detalhes/${r.data.id}`);
          })
          .catch(e => console.log(e))
      }
    };

    saveUser();
  };

  const excluirUsuario = () => {
    const deleteUser = async () => {
      axios.delete<IUser>(`http://localhost:5000/users/${id}`)
        .then(r => {
          console.log(r);

          setUsuario(undefined);
          setarStatesUsuario();
          navigate('/usuarios');
        })
        .catch(e => console.log(e))
    };

    deleteUser();
  };

  if (loading) {
    return (
      <div>
        <PreLoader />
      </div>
    );
  }

  return (
    <section>
      <div className={stylesTema.voltar}>
        <h2
          className={stylesTema.voltar__texto}
          onClick={() => navigate(-1)}
        >
          {'< Voltar'}
        </h2>
        <button
          type='button'
          id='cadastrar'
          name='cadastrar'
          className={stylesTema.voltar__botao__salvar}
          onClick={() => salvarUsuario()}
        >
          Salvar
        </button>
        <button
          type='button'
          id='excluir'
          name='excluir'
          style={{
            display: id ? 'block' : 'none'
          }}
          className={stylesTema.voltar__botao__excluir}
          onClick={() => excluirUsuario()}
        >
          Excluir
        </button>
      </div>
      <div className={stylesTema.container}>
        <Geral
          nomeCompleto={username}
          setNomeCompleto={setUsername}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          cpf_cnpj={cpf_cnpj}
          setCpf_cnpj={setCpf_cnpj}
          date_birth={date_birth}
          setDate_birth={setDate_birth}
        />
        <Endereco
          address={address}
          setAddress={setAddress}
        />
      </div>
    </section>
  );
}