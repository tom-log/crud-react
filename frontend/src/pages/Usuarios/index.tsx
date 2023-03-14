import axios from 'axios';
import { useEffect, useState } from 'react';
import { IUser } from 'types/IUser';
import styles from './Usuarios.module.scss';
import stylesTema from 'styles/Tema.module.scss';
import { useNavigate } from 'react-router-dom';
import PreLoader from 'components/PreLoader';

export default function Usuarios() {
  const [loading, setLoading] = useState<boolean>(true);

  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      axios.get<IUser[]>('http://localhost:5000/users')
        .then(r => {
          setUsuarios(r.data);
          setLoading(false);
        })
        .catch(e => console.log(e))
    };
    getUsers();
  }, []);

  if (loading) {
    return (
      <div>
        <PreLoader />
      </div>
    );
  }

  return (
    <section>
      <div className={stylesTema.titulo}>
        <h2 className={stylesTema.titulo__texto}>Usuários</h2>
        <button
          type='button'
          id='cadastrar'
          name='cadastrar'
          className={stylesTema.titulo__botao}
          onClick={() => navigate('/detalhes')}
        >
          Cadastrar
        </button>
      </div>
      <div className={stylesTema.container}>
        {usuarios.map(usuario => (
          <div
            className={styles.usuario}
            key={usuario.id}
            onClick={() => navigate(`/detalhes/${usuario.id}`, { state: { usuario } })}
          >

            <div className={styles.usuario__name}>
              {usuario.username}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}