import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './pagesStyle/Login.css';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/login`;

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        const userDataJSON = JSON.stringify(res.data.user);
        localStorage.setItem('userData', userDataJSON);

        navigate('/');
        window.location.reload();
      })

      .catch((err) => {
        toast.error(err.data);
      });

    reset();
  };

  return (
    <div className="longin__container">
      <form className="login__form" onSubmit={handleSubmit(submit)}>
        <div className="loginForm__containerImg">
          <img src="/rooster.svg" alt="" />
        </div>

        <section className="loginForm__sectionOne">
          <h1>INICIAR SESION</h1>
          <div className="loginForm__div">
            <label htmlFor="email">CORREO:</label>
            <input
              {...register('email')}
              id="email"
              type="text"
              required
              placeholder="Ingrese su correo"
            />
          </div>
          <div className="loginForm__div">
            <label htmlFor="password">CONTRASEÑA:</label>
            <input
              {...register('password')}
              id="password"
              type="password"
              required
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button>iniciar sesión</button>
        </section>
      </form>
    </div>
  );
};

export default Login;
