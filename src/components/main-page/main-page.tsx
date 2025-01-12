import { FC, useEffect, useRef, useState } from 'react';
import styles from './main-page.module.css';
import { useFetch } from '../../api/useFetch';
import QuizeApi from '../../api/main/main';
import QuizButton from './components';
import hello from '../../assets/main-page/hello.gif';
import dance from '../../assets/main-page/dance.gif';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../api/store/useAuth';

const MainPage: FC = () => {
  const { isAuth } = useAuth();
  const [quizes, setQuizes] = useState<Array<{ id: string; name: string }>>([]);

  const { fetching, isLoading, error } = useFetch(async () => {
    const data = await QuizeApi.getQuizes();
    setQuizes(data);
  });

  useEffect(() => {
    fetching();
  }, []);

  const renderQuizButtons = () => {
    return quizes.map((el) => {
      return <QuizButton key={el.name} path={`/quiz/${el.name}`} name={el.name} id={el.id} />;
    });
  };

  const quizzesButtons = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    const t = setTimeout(() => {
      if (location.hash === '#quizzes' && quizzesButtons.current) {
        quizzesButtons.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <p className={styles.preview}>Язык жестов ещкере — легко и увлекательно! Пройди квизы и узнай больше.</p>
        <div className={styles.quizHeadButtons}>
          <img style={{ width: 'calc((1vh + 1vw) * 4)' }} src={hello} alt="" />
        </div>
      </nav>
      <header className={styles.header}>QUIZ</header>
      <div className={styles.content}>
        <section id={styles.actuality} className={styles.section}>
          <h3>Актуальность языка жестов</h3>
          <p>
            На данный момент, в мире насчитывается около 80 миллионов глухих людей. Такие люди не могут общаться на тех
            же языках, что и мы. У них существует свой, особенный язык - язык жестов. Он помогает им общаться как между
            собой, так и с другими людьми. К сожалению, язык жестов не является международным. Это значит, что человек,
            владеющий русским жестовым языком, не поймёт человека из, к примеру, Германии.
          </p>
        </section>
        <section id={styles.knowlege} className={styles.section}>
          <img style={{ width: 'calc((1vh + 1vw) * 4)' }} src={dance} alt="" />
          <div id={styles.knowlegeContent}>
            <h3>
              На этом сайте вы можете проверить свои знания языка жестов с помощью подготовленных нашей командой Квизов.
            </h3>
            <p>
              В формате квизов, вы можете проверить свои знания разных жестовых языков (на данный момент это: русский,
              английский и бангладешский). Такой формат упрощает обучение и делает его более запоминающимся.
            </p>
          </div>
        </section>
        <section id={styles.thems} className={styles.section}>
          <h3>Темы квизов</h3>
          <p>
            <b>Ниже</b> представлены темы квизов, в которых содержатся простые вопросы, на которые могут ответить даже
            те, кто начал учить язык жестов совсем недавно.
          </p>
        </section>
      </div>

      <div ref={quizzesButtons} className={styles.quizButtonsWrapper}>
        {isLoading && <p>Loading...</p>}
        {!isAuth && <h2>Авторизуйтесь</h2>}
        {error && isAuth && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!isLoading && isAuth && !error && quizes.length > 0 && renderQuizButtons()}
      </div>
      <p className={styles.quizRetryInfo}>
        На прохождение квиза дается вторая попытка если Вы набрали меньше 50 баллов.
      </p>
    </div>
  );
};

/* 

				<h3>Advantages of Quizzes</h3>
				<p>
					Tests support students' in the acquisition of a general or specific knowledge of a 
					subject. Quizzes are meant to promote enjoyable learning strategies and improve 
					general knowledge. Quiz tournaments allow students to "think outside the box" 
					and from a variety of angles.
				</p>
				<h3>Topics which are covered</h3>
				<p>
					HTML, CSS, and JavaScript are the first few languages we should learn in order to 
					begin as a Front End Developer. Because of their close relationship, 
					HTML and CSS are usually taught together. JavaScript will also be covered in 
					this course together with HTML and CSS.
					The fundamentals of PHP and WebGL are then presented, in addition to Automation 
					Testing. Topics like HTTP, Developer Tools, the internet, and the web will be 
					briefly covered in the theoretical sections. Additionally, 
					frameworks like Laravel and BootStrap will be covered. 
					A cloud-based design tool named Figma is also included in this 
					course so that designers can collaborate, and implement their creative 
					ideas more effectively.
				</p>
				<h3>Topics for quizzes</h3>
				<p>
					<b>Followings</b> are the quizzes topics, which contain simple questions for beginners:
				</p>
				

*/

export default MainPage;
