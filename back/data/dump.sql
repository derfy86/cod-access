--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)

-- Started on 2021-06-22 11:52:24 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 16435)
-- Name: client; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.client (
    id integer NOT NULL,
    email text NOT NULL,
    pseudo text NOT NULL,
    password text NOT NULL,
    responsibility_id integer NOT NULL,
    picture_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.client OWNER TO cod_access_user;

--
-- TOC entry 223 (class 1259 OID 16565)
-- Name: client_doc; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.client_doc (
    id integer NOT NULL,
    client_id integer,
    doc_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.client_doc OWNER TO cod_access_user;

--
-- TOC entry 222 (class 1259 OID 16563)
-- Name: client_doc_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.client_doc ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.client_doc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16547)
-- Name: client_exercise; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.client_exercise (
    id integer NOT NULL,
    score integer,
    client_id integer,
    exercise_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.client_exercise OWNER TO cod_access_user;

--
-- TOC entry 220 (class 1259 OID 16545)
-- Name: client_exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.client_exercise ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.client_exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 16433)
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.client ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16504)
-- Name: doc; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.doc (
    id integer NOT NULL,
    title text NOT NULL,
    brief text,
    slug text NOT NULL,
    content text NOT NULL,
    published boolean NOT NULL,
    picture_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.doc OWNER TO cod_access_user;

--
-- TOC entry 214 (class 1259 OID 16502)
-- Name: doc_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.doc ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.doc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 16467)
-- Name: exercise; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.exercise (
    id integer NOT NULL,
    title text NOT NULL,
    brief text,
    slug text,
    published boolean NOT NULL,
    kind_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.exercise OWNER TO cod_access_user;

--
-- TOC entry 210 (class 1259 OID 16465)
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.exercise ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 16601)
-- Name: exercise_theme; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.exercise_theme (
    id integer NOT NULL,
    exercise_id integer,
    theme_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.exercise_theme OWNER TO cod_access_user;

--
-- TOC entry 226 (class 1259 OID 16599)
-- Name: exercise_theme_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.exercise_theme ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.exercise_theme_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 16456)
-- Name: kind; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.kind (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.kind OWNER TO cod_access_user;

--
-- TOC entry 208 (class 1259 OID 16454)
-- Name: kind_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.kind ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.kind_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 205 (class 1259 OID 16424)
-- Name: picture; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.picture (
    id integer NOT NULL,
    name text,
    path text NOT NULL,
    alternative text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.picture OWNER TO cod_access_user;

--
-- TOC entry 204 (class 1259 OID 16422)
-- Name: picture_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.picture ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.picture_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16531)
-- Name: possible_answer; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.possible_answer (
    id integer NOT NULL,
    content text NOT NULL,
    correct boolean NOT NULL,
    question_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.possible_answer OWNER TO cod_access_user;

--
-- TOC entry 218 (class 1259 OID 16529)
-- Name: possible_answer_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.possible_answer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.possible_answer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 16483)
-- Name: question; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.question (
    id integer NOT NULL,
    brief text,
    code text NOT NULL,
    explanation text NOT NULL,
    exercise_id integer,
    picture_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.question OWNER TO cod_access_user;

--
-- TOC entry 212 (class 1259 OID 16481)
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.question ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 203 (class 1259 OID 16413)
-- Name: responsibility; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.responsibility (
    id integer NOT NULL,
    entitled text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.responsibility OWNER TO cod_access_user;

--
-- TOC entry 202 (class 1259 OID 16411)
-- Name: responsibility_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.responsibility ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.responsibility_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16520)
-- Name: theme; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.theme (
    id integer NOT NULL,
    name text NOT NULL,
    color text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.theme OWNER TO cod_access_user;

--
-- TOC entry 225 (class 1259 OID 16583)
-- Name: theme_doc; Type: TABLE; Schema: public; Owner: cod_access_user
--

CREATE TABLE public.theme_doc (
    id integer NOT NULL,
    theme_id integer,
    doc_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.theme_doc OWNER TO cod_access_user;

--
-- TOC entry 224 (class 1259 OID 16581)
-- Name: theme_doc_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.theme_doc ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.theme_doc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16518)
-- Name: theme_id_seq; Type: SEQUENCE; Schema: public; Owner: cod_access_user
--

ALTER TABLE public.theme ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.theme_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3949 (class 0 OID 16435)
-- Dependencies: 207
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.client (id, email, pseudo, password, responsibility_id, picture_id, created_at, updated_at) FROM stdin;
19	anne-kim44@hotmail.fr	AK	$2b$10$VoMIMKTCKkXX4mrcJHuZW.0A93jhVk3Y/EHLui.aBR2HraAmX7.D2	1	1	2021-05-26 07:11:06.63	2021-05-26 07:11:06.63
10	annekim.banchereau@gmail.com	Anne-Kim	$2b$10$E9Aa/S6EEtxsPXywRl4pT.DnE9ddqPkkNSJgD7VV9L5VuZ3sbmfFC	2	132	2021-05-18 07:56:07.274	2021-05-26 11:55:43.485
20	fredericbourigeaud@gmail.com	fred	$2b$10$qVxSyImeAEBQLrj16m1sdOXf1hYnfTUfwnj92K.dX9ZcpCCCih7Y6	1	133	2021-05-26 11:57:08.333	2021-05-26 11:58:04.508
1	sanders.florian@gmail.com	Captain	$2b$10$FsNsfScJcN25hnWFrShyjOmwOt5fBU7QZUAsW.0xwl3.Wnxk.XYQC	2	142	2021-03-31 13:25:03.372	2021-05-27 17:36:24.116
26	nautilus2@yopmail.com	Flo	$2b$10$bEccOTvNQakkx.cfTllBaOLXGuSImW0Cu3pIkJirvABtpdXrtVNCm	1	144	2021-05-28 08:56:19.082	2021-05-28 08:58:42.302
2	bourigeaudfrederic@yahoo.fr	derfyy	$2b$10$NlXSRiuWJs5AOUhRGzW07efvWcN3LdmhdLSXjOcSkVab44W.YpaTO	2	118	2021-04-12 09:40:46.375	2021-05-26 07:01:08.457
\.


--
-- TOC entry 3965 (class 0 OID 16565)
-- Dependencies: 223
-- Data for Name: client_doc; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.client_doc (id, client_id, doc_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3963 (class 0 OID 16547)
-- Dependencies: 221
-- Data for Name: client_exercise; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.client_exercise (id, score, client_id, exercise_id, created_at, updated_at) FROM stdin;
1	100	1	1	2021-04-12 21:01:18.679	2021-04-12 21:01:18.679
2	100	2	1	2021-04-13 06:52:05.368	2021-04-20 15:59:24.92
3	50	2	6	2021-04-21 07:06:21.178	2021-04-21 07:06:21.178
4	50	2	9	2021-04-21 16:02:35.05	2021-04-21 16:02:35.05
12	50	10	1	2021-05-18 07:56:52.462	2021-05-18 07:56:52.462
15	100	10	7	2021-05-19 10:14:43.344	2021-05-19 10:14:43.344
17	100	2	7	2021-05-21 08:09:56.738	2021-05-21 08:09:56.738
18	100	1	6	2021-05-23 13:04:05.168	2021-05-23 13:05:56.117
20	100	10	69	2021-05-24 20:54:42.663	2021-05-24 20:54:42.663
22	0	1	7	2021-05-25 11:41:47.387	2021-05-25 11:41:47.387
23	100	19	9	2021-05-26 07:52:00.154	2021-05-26 07:52:35.81
24	100	20	7	2021-05-26 11:58:24.565	2021-05-26 12:33:13.737
26	100	10	9	2021-05-26 14:25:47.447	2021-05-26 14:26:38.968
19	100	1	66	2021-05-23 14:53:08.179	2021-05-27 15:27:53.603
30	100	26	1	2021-05-28 08:57:51.167	2021-05-28 08:57:51.167
\.


--
-- TOC entry 3957 (class 0 OID 16504)
-- Dependencies: 215
-- Data for Name: doc; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.doc (id, title, brief, slug, content, published, picture_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3953 (class 0 OID 16467)
-- Dependencies: 211
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.exercise (id, title, brief, slug, published, kind_id, created_at, updated_at) FROM stdin;
1	Guide de démarrage du Nautilus - Attributs alt	<p>Mon ingénieur en chef étant aveugle, il aurait besoin que quelqu'un répare le code de la documentation pour qu'il puisse lire son contenu et mettre en marche notre Nautilus flambant neuf.</p><p>J'ai trouvé toutes les explications nécessaires dans le<a href="https://disic.github.io/guide-integrateur/9-images.html"> guide de l'intégrateur du RGAA, section images</a>.</p><p>Je te laisse travailler et m'envoyer les réparations dès que possible !</p>	\N	t	\N	2021-04-12 09:39:35.593	2021-04-12 09:42:47.31
12	Menu application Nautilus - Afficher / Masquer un composant	<p>Je souhaiterais être informé de l’état (ouvert / fermé) du menu de l’application lorsque j’interagis avec le bouton qui le contrôle. J’ai beau appuyer sur la touche entrée ou espace pour activer le bouton d’ouverture, le lecteur d’écran ne me restitue pas l’information.</p>	\N	t	\N	2021-04-13 17:03:33.223	2021-05-25 09:12:15.219
71	test pagination		\N	f	\N	2021-05-25 09:53:45.944	2021-05-25 09:53:51.757
25	test 4		\N	f	\N	2021-05-16 10:25:33.797	2021-05-25 16:44:29.624
11	Gestion des membres de l'équipage - Fenêtre modale	<p>Lorsque ma sous-officière tente de supprimer l’un des membres de l’équipe, une fenêtre s’affiche pour lui demander confirmation.</p><p>Malheureusement, cette fenêtre ne possède pas de nom accessible ni de titre, et elle ne parvient donc pas à interagir avec cette dernière.</p>	\N	t	\N	2021-04-13 16:58:56.639	2021-04-13 17:03:15.938
26	test 5		\N	f	\N	2021-05-16 10:25:43.428	2021-05-25 16:44:44.391
27	test 6		\N	f	\N	2021-05-16 10:25:51.406	2021-05-25 16:44:56.911
29	test 7		\N	f	\N	2021-05-16 10:26:15.776	2021-05-25 16:45:06.089
30	test 8		\N	f	\N	2021-05-16 10:27:03.483	2021-05-25 16:45:14.57
31	test 9		\N	f	\N	2021-05-16 10:27:15.313	2021-05-25 16:45:22.236
7	Gestion des droits des membres - Étiquettes	<p>Ma sous-officière n’a pas de mobilité des membres supérieurs et <strong>navigue dans les interfaces grâce à un logiciel de reconnaissance vocale</strong>. Elle souhaite définir les droits d’accès de tous les membres d’équipage mais elle ne parvient pas à accéder à certains éléments.</p>	\N	t	\N	2021-04-13 15:51:38.023	2021-04-13 15:54:38.991
32	test 10		\N	f	\N	2021-05-16 10:27:25.803	2021-05-25 16:45:28.902
33	test 11		\N	f	\N	2021-05-16 10:27:34.262	2021-05-25 16:45:36.932
34	test 12		\N	f	\N	2021-05-16 10:27:42.811	2021-05-25 16:45:48.699
35	test 13		\N	f	\N	2021-05-16 10:27:51.959	2021-05-25 16:45:55.748
6	Diagnostics des moteurs - Balises svg	<p>Mon chef mécanicien a besoin de consulter la page de diagnostic des moteurs pour vérifier que tout est en ordre. Lorsqu’il navigue dans <strong>la page du rapport avec son lecteur d’écran</strong>, de nombreuses <strong>informations non pertinentes sont restituées</strong>, notamment pour toutes les icônes &lt;svg&gt; placées avant chaque texte. Ces éléments sont souvent restitués par <strong>“Groupe, vide”</strong>.</p><p>L’assistant du chef mécanicien navigue uniquement au clavier et <strong>lorsqu’il tabule pour parcourir son contenu</strong>, il passe sur chacune des icônes svg alors qu’elles ne sont pas interactives.</p>	\N	t	\N	2021-04-13 15:43:05.487	2021-04-13 16:55:23.24
37	test 15		\N	f	\N	2021-05-16 10:28:13.494	2021-05-25 16:46:04.613
36	test 14		\N	f	\N	2021-05-16 10:28:02.143	2021-05-25 16:53:25.161
82	Titre	<p>toutes</p>	\N	t	\N	2021-05-28 08:59:24.554	2021-05-28 09:00:58.097
69	test publication	<p>coucou</p>	\N	f	\N	2021-05-24 20:52:53.44	2021-05-25 07:33:11.336
9	Démarrage du Nautilus - Gestion des erreurs	<p>Mon ingénieur en chef est aveugle et lorsqu’il tente d’entrer les codes de démarrage du Nautilus, <strong>il semble y avoir une erreur mais il n’en est pas informé</strong>.</p>	\N	t	\N	2021-04-13 15:56:03.173	2021-05-25 09:06:02.798
66	Exercice de test - Jeu de données Florian	<p>Mon intro d'exercice</p>	\N	t	\N	2021-05-23 13:43:26.866	2021-05-27 15:27:30.313
\.


--
-- TOC entry 3969 (class 0 OID 16601)
-- Dependencies: 227
-- Data for Name: exercise_theme; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.exercise_theme (id, exercise_id, theme_id, created_at, updated_at) FROM stdin;
1	1	1	2021-04-12 09:40:07.24554	\N
2	6	1	2021-04-13 15:45:27.506196	\N
4	7	11	2021-04-13 15:53:30.929833	\N
5	9	11	2021-04-13 16:25:10.942401	\N
6	11	7	2021-04-13 17:00:19.016667	\N
7	12	7	2021-04-13 17:08:48.046972	\N
31	66	1	2021-05-23 13:44:43.783958	\N
32	69	1	2021-05-24 20:53:03.747866	\N
33	36	3	2021-05-25 16:41:44.528491	\N
41	82	1	2021-05-28 09:00:09.642538	\N
\.


--
-- TOC entry 3951 (class 0 OID 16456)
-- Dependencies: 209
-- Data for Name: kind; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.kind (id, name, created_at, updated_at) FROM stdin;
1	drag n drop	2021-03-31 13:09:02.951595	\N
2	code pen	2021-03-31 13:09:02.951595	\N
\.


--
-- TOC entry 3947 (class 0 OID 16424)
-- Dependencies: 205
-- Data for Name: picture; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.picture (id, name, path, alternative, created_at, updated_at) FROM stdin;
2	plane.jpg	www.picimage.com/331282.jpg		2021-03-31 13:09:02.949975	\N
3	car.jpg	www.picimage.com/22122.jpg		2021-03-31 13:09:02.949975	\N
4	plane.jpg	www.picimage.com/331282.jpg		2021-03-31 13:09:02.949975	\N
5	car.jpg	www.picimage.com/22122.jpg		2021-03-31 13:09:02.949975	\N
6	plane.jpg	www.picimage.com/331282.jpg		2021-03-31 13:09:02.949975	\N
7	car.jpg	www.picimage.com/22122.jpg		2021-03-31 13:09:02.949975	\N
8	plane.jpg	www.picimage.com/331282.jpg		2021-03-31 13:09:02.949975	\N
9	car.jpg	www.picimage.com/22122.jpg		2021-03-31 13:09:02.949975	\N
10	plane.jpg	www.picimage.com/331282.jpg		2021-03-31 13:09:02.949975	\N
11	car.jpg	www.picimage.com/22122.jpg		2021-03-31 13:09:02.949975	\N
12	plane.jpg	www.picimage.com/331282.jpg		2021-03-31 13:09:02.949975	\N
13	car.jpg	www.picimage.com/22122.jpg		2021-03-31 13:09:02.949975	\N
14	plane.jpg	www.picimage.com/331282.jpg		2021-03-31 13:09:02.949975	\N
15	profile.jpg	https://cdn.pixabay.com/photo/2019/12/01/23/53/otter-4666677_1280.jpg		2021-03-31 13:09:02.949975	\N
16	1617197588125_robot.png	/1617197588125_robot.png	\N	2021-03-31 13:33:08.139	2021-03-31 13:33:08.139
17	1618220463549_lancement_nautilus.png	/1618220463549_lancement_nautilus.png		2021-04-12 09:41:03.57	2021-04-12 09:41:03.57
18	1618220522568_image_deco_exo.png	/1618220522568_image_deco_exo.png		2021-04-12 09:42:02.593	2021-04-12 09:42:02.593
20	1618220613340_image_deco_exo.png	/1618220613340_image_deco_exo.png		2021-04-12 09:43:33.366	2021-04-12 09:43:33.366
21	1618296398893_image_(21).png	\\1618296398893_image_(21).png	\N	2021-04-13 06:46:38.907	2021-04-13 06:46:38.907
22	1618306813010_IMG_20191231_194108.jpg	\\1618306813010_IMG_20191231_194108.jpg	\N	2021-04-13 09:40:13.021	2021-04-13 09:40:13.021
23	1618332989913_svg_info_exo.png	/1618332989913_svg_info_exo.png		2021-04-13 16:56:29.92	2021-04-13 16:56:29.92
24	1618389218166_temperature2.PNG	/1618389218166_temperature2.PNG		2021-04-14 08:33:38.18	2021-04-14 08:33:38.18
25	1618389254514_svg_info_exo.png	/1618389254514_svg_info_exo.png		2021-04-14 08:34:14.517	2021-04-14 08:34:14.517
26	1618389337478_form.PNG	/1618389337478_form.PNG		2021-04-14 08:35:37.481	2021-04-14 08:35:37.481
27	1618389448345_form.PNG	/1618389448345_form.PNG		2021-04-14 08:37:28.347	2021-04-14 08:37:28.347
28	1618389485467_modale.PNG	/1618389485467_modale.PNG		2021-04-14 08:38:05.483	2021-04-14 08:38:05.483
29	1618389667107_modale.PNG	/1618389667107_modale.PNG		2021-04-14 08:41:07.123	2021-04-14 08:41:07.123
30	1618389719876_menu_disclosure_exo.png	/1618389719876_menu_disclosure_exo.png		2021-04-14 08:41:59.878	2021-04-14 08:41:59.878
31	1618390591947_temperature2.PNG	/1618390591947_temperature2.PNG		2021-04-14 08:56:31.962	2021-04-14 08:56:31.962
32	1618390613654_svg_info_exo.png	/1618390613654_svg_info_exo.png		2021-04-14 08:56:53.657	2021-04-14 08:56:53.657
33	1618390791836_modale.PNG	/1618390791836_modale.PNG		2021-04-14 08:59:51.853	2021-04-14 08:59:51.853
34	1618390800751_modale.PNG	/1618390800751_modale.PNG		2021-04-14 09:00:00.767	2021-04-14 09:00:00.767
35	1618390866754_menu_disclosure_exo.png	/1618390866754_menu_disclosure_exo.png		2021-04-14 09:01:06.757	2021-04-14 09:01:06.757
36	1618408457661_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	/1618408457661_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	\N	2021-04-14 13:54:17.7	2021-04-14 13:54:17.7
37	1618408665884_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	/1618408665884_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	\N	2021-04-14 13:57:45.885	2021-04-14 13:57:45.885
38	1618408682360_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	/1618408682360_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	\N	2021-04-14 13:58:02.364	2021-04-14 13:58:02.364
39	1618409534641_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	/1618409534641_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	\N	2021-04-14 14:12:14.642	2021-04-14 14:12:14.642
40	1618409595999_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	/1618409595999_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	\N	2021-04-14 14:13:15.999	2021-04-14 14:13:15.999
41	1618930220688_anne-kim.jpg	/1618930220688_anne-kim.jpg	\N	2021-04-20 14:50:20.699	2021-04-20 14:50:20.699
42	1618930264726_loutre.jpg	/1618930264726_loutre.jpg	\N	2021-04-20 14:51:04.75	2021-04-20 14:51:04.75
46	1618931217892_modal.png	/1618931217892_modal.png	\N	2021-04-20 15:06:57.909	2021-04-20 15:06:57.909
48	1618931530025_modal.png	/1618931530025_modal.png	\N	2021-04-20 15:12:10.03	2021-04-20 15:12:10.03
52	1618931888689_modal.png	/1618931888689_modal.png	\N	2021-04-20 15:18:08.695	2021-04-20 15:18:08.695
53	1618932133701_modal.png	/1618932133701_modal.png	\N	2021-04-20 15:22:13.708	2021-04-20 15:22:13.708
54	1618934486803_IMG_20210325_101350.jpg	\\1618934486803_IMG_20210325_101350.jpg	d	2021-04-20 16:01:26.839	2021-04-20 16:01:26.839
55	1618995872443_nautilus.jpg	/1618995872443_nautilus.jpg	\N	2021-04-21 09:04:32.465	2021-04-21 09:04:32.465
56	1618996218210_loutre.jpg	/1618996218210_loutre.jpg	\N	2021-04-21 09:10:18.224	2021-04-21 09:10:18.224
57	1618996235445_cute_panda.jpg	/1618996235445_cute_panda.jpg	\N	2021-04-21 09:10:35.463	2021-04-21 09:10:35.463
58	1618996342705_loutre.jpg	/1618996342705_loutre.jpg	\N	2021-04-21 09:12:22.719	2021-04-21 09:12:22.719
59	1618996595234_cute_panda.jpg	/1618996595234_cute_panda.jpg	\N	2021-04-21 09:16:35.251	2021-04-21 09:16:35.251
60	1618996943853_loutre.jpg	/1618996943853_loutre.jpg	\N	2021-04-21 09:22:23.881	2021-04-21 09:22:23.881
61	1618997682878_nautilus.jpg	/1618997682878_nautilus.jpg	\N	2021-04-21 09:34:42.896	2021-04-21 09:34:42.896
62	1618997739679_modal.png	/1618997739679_modal.png	\N	2021-04-21 09:35:39.687	2021-04-21 09:35:39.687
63	1619007785265_loutre.jpg	/1619007785265_loutre.jpg	\N	2021-04-21 12:23:05.303	2021-04-21 12:23:05.303
64	1619007832610_loutre.jpg	/1619007832610_loutre.jpg	\N	2021-04-21 12:23:52.673	2021-04-21 12:23:52.673
65	1619009420613_loutre.jpg	/1619009420613_loutre.jpg	\N	2021-04-21 12:50:20.629	2021-04-21 12:50:20.629
66	1619009601775_nautilus.jpg	/1619009601775_nautilus.jpg	\N	2021-04-21 12:53:21.811	2021-04-21 12:53:21.811
67	cute_panda.jpg1619083738618.jpg	/cute_panda.jpg1619083738618.jpg	\N	2021-04-22 09:28:58.646	2021-04-22 09:28:58.646
68	loutre.jpg1619083749558.jpg	/loutre.jpg1619083749558.jpg	\N	2021-04-22 09:29:09.567	2021-04-22 09:29:09.567
69	1619084015739_modal.png	/1619084015739_modal.png	\N	2021-04-22 09:33:35.746	2021-04-22 09:33:35.746
1	car.jpg	1615818963079_loutre-1-085135.jpg		2021-03-31 13:09:02.949975	\N
70	1619084049894_loutre.jpg	/1619084049894_loutre.jpg	\N	2021-04-22 09:34:09.914	2021-04-22 09:34:09.914
71	1619084441217_modal.png	/1619084441217_modal.png	\N	2021-04-22 09:40:41.222	2021-04-22 09:40:41.222
72	1619084455004_modal.png	/1619084455004_modal.png	\N	2021-04-22 09:40:55.007	2021-04-22 09:40:55.007
73	1619090705685_modal.png	/1619090705685_modal.png		2021-04-22 11:25:05.697	2021-04-22 11:25:05.697
74	1619091183251_loutre.jpg	/1619091183251_loutre.jpg	\N	2021-04-22 11:33:03.277	2021-04-22 11:33:03.277
76	1619094507687_cute_panda.jpg	/1619094507687_cute_panda.jpg	\N	2021-04-22 12:28:27.719	2021-04-22 12:28:27.719
77	1619094582085_nautilus.jpg	/1619094582085_nautilus.jpg	\N	2021-04-22 12:29:42.099	2021-04-22 12:29:42.099
78	1619094609104_nautilus.jpg	/1619094609104_nautilus.jpg		2021-04-22 12:30:09.121	2021-04-22 12:30:09.121
79	1619099620156_wave.svg	/1619099620156_wave.svg	\N	2021-04-22 13:53:40.158	2021-04-22 13:53:40.158
80	1619100265882_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	/1619100265882_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	\N	2021-04-22 14:04:25.883	2021-04-22 14:04:25.883
81	1619111606095_wave-light.svg	/1619111606095_wave-light.svg	\N	2021-04-22 17:13:26.099	2021-04-22 17:13:26.099
82	1619111650065_buoy.svg	/1619111650065_buoy.svg	\N	2021-04-22 17:14:10.068	2021-04-22 17:14:10.068
83	1619166455635_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	/1619166455635_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	\N	2021-04-23 08:27:35.677	2021-04-23 08:27:35.677
84	1619167788764_wave.svg	/1619167788764_wave.svg	\N	2021-04-23 08:49:48.764	2021-04-23 08:49:48.764
85	1619167912810_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	/1619167912810_vedettes-du-zoo-de-mulhouse-les-pandas-roux-espece-en-danger-dans-la-nature-sont-sur-le-devant-de-la-scene-ce-week-end-archives-l-alsace-herve-kielwasser-1600532036.jpeg	\N	2021-04-23 08:51:52.851	2021-04-23 08:51:52.851
86	1619514801395_Frédéric.jpg	\\1619514801395_Frédéric.jpg	\N	2021-04-27 09:13:21.405	2021-04-27 09:13:21.405
87	1619692140251__DSC0073.jpg	\\1619692140251__DSC0073.jpg	\N	2021-04-29 10:29:00.396	2021-04-29 10:29:00.396
88	1619692382494__DSC0095.jpg	\\1619692382494__DSC0095.jpg		2021-04-29 10:33:02.663	2021-04-29 10:33:02.663
89	1619692427934__DSC0095.jpg	\\1619692427934__DSC0095.jpg	\N	2021-04-29 10:33:48.089	2021-04-29 10:33:48.089
91	1619694222722_photo_cv.jpg	/1619694222722_photo_cv.jpg	\N	2021-04-29 11:03:42.73	2021-04-29 11:03:42.73
92	1619694519308_html_css.svg	/1619694519308_html_css.svg	\N	2021-04-29 11:08:39.309	2021-04-29 11:08:39.309
93	1619694935953_js_bw.svg	/1619694935953_js_bw.svg		2021-04-29 11:15:35.957	2021-04-29 11:15:35.957
94	1619703339380_20150906_145218.jpg	\\1619703339380_20150906_145218.jpg	\N	2021-04-29 13:35:39.402	2021-04-29 13:35:39.402
95	1619703433213_fred_bis.jpg	\\1619703433213_fred_bis.jpg	\N	2021-04-29 13:37:13.223	2021-04-29 13:37:13.223
96	1621157798204_Sailor_Monochromatic.svg	/1621157798204_Sailor_Monochromatic.svg	\N	2021-05-16 09:36:38.21	2021-05-16 09:36:38.21
101	1621178930876_lancement_nautilus(1).png	/1621178930876_lancement_nautilus(1).png		2021-05-16 15:28:50.917	2021-05-16 15:28:50.917
102	1621178944880_image_deco_exo.png	/1621178944880_image_deco_exo.png		2021-05-16 15:29:04.91	2021-05-16 15:29:04.91
103	1621273656607_proxy-dev-server.png	/1621273656607_proxy-dev-server.png	youpi	2021-05-17 17:47:36.615	2021-05-17 17:47:36.615
104	1621273732422_cp7-server.png	/1621273732422_cp7-server.png		2021-05-17 17:48:52.423	2021-05-17 17:48:52.423
105	1621275159747_modif.PNG	\\1621275159747_modif.PNG	\N	2021-05-17 18:12:39.755	2021-05-17 18:12:39.755
106	1621275239042_modif.PNG	\\1621275239042_modif.PNG		2021-05-17 18:13:59.052	2021-05-17 18:13:59.052
107	1621328863371_modif.PNG	\\1621328863371_modif.PNG	\N	2021-05-18 09:07:43.381	2021-05-18 09:07:43.381
108	1621328926205_modif.PNG	\\1621328926205_modif.PNG	\N	2021-05-18 09:08:46.207	2021-05-18 09:08:46.207
109	1621355299770_codAccess_mcd.svg	/1621355299770_codAccess_mcd.svg	\N	2021-05-18 16:28:19.777	2021-05-18 16:28:19.777
110	1621355373282_server-express.png	/1621355373282_server-express.png	\N	2021-05-18 16:29:33.289	2021-05-18 16:29:33.289
111	1621356410227_codAccess_mcd.svg	/1621356410227_codAccess_mcd.svg	\N	2021-05-18 16:46:50.233	2021-05-18 16:46:50.233
112	1621409104109_axios.png	\\1621409104109_axios.png	\N	2021-05-19 07:25:04.123	2021-05-19 07:25:04.123
113	1621409182705_image.png	\\1621409182705_image.png	\N	2021-05-19 07:26:22.71	2021-05-19 07:26:22.71
114	1621409266280_arbo.PNG	\\1621409266280_arbo.PNG	\N	2021-05-19 07:27:46.282	2021-05-19 07:27:46.282
115	1621411249299_image.png	\\1621411249299_image.png	\N	2021-05-19 08:00:49.304	2021-05-19 08:00:49.304
116	1621579902024_seagull.png	\\1621579902024_seagull.png		2021-05-21 06:51:42.046	2021-05-21 06:51:42.046
117	1621580029728_shrimp.png	\\1621580029728_shrimp.png		2021-05-21 06:53:49.732	2021-05-21 06:53:49.732
118	1621580443079_seagull.png	\\1621580443079_seagull.png	\N	2021-05-21 07:00:43.082	2021-05-21 07:00:43.082
119	1621581378261_shrimp.png	\\1621581378261_shrimp.png		2021-05-21 07:16:18.273	2021-05-21 07:16:18.273
120	1621611622158_DSC_6549.JPG	\\1621611622158_DSC_6549.JPG	\N	2021-05-21 15:40:22.274	2021-05-21 15:40:22.274
121	1621777524018_danbo_turtle.jpg	/1621777524018_danbo_turtle.jpg		2021-05-23 13:45:24.026	2021-05-23 13:45:24.026
122	1621777656573_robot.png	/1621777656573_robot.png		2021-05-23 13:47:36.578	2021-05-23 13:47:36.578
123	1621777755095_html_css.svg	/1621777755095_html_css.svg		2021-05-23 13:49:15.099	2021-05-23 13:49:15.099
125	1621942176366_image_deco_exo.png	/1621942176366_image_deco_exo.png		2021-05-25 11:29:36.392	2021-05-25 11:29:36.392
126	1621942328226_1618390591947_temperature2.PNG	/1621942328226_1618390591947_temperature2.PNG		2021-05-25 11:32:08.239	2021-05-25 11:32:08.239
127	1621942343623_1618390613654_svg_info_exo.png	/1621942343623_1618390613654_svg_info_exo.png		2021-05-25 11:32:23.627	2021-05-25 11:32:23.627
128	1621942464384_modale.png	/1621942464384_modale.png		2021-05-25 11:34:24.402	2021-05-25 11:34:24.402
129	1621942472282_modale.png	/1621942472282_modale.png		2021-05-25 11:34:32.301	2021-05-25 11:34:32.301
130	1621942533926_1618390866754_menu_disclosure_exo.png	/1621942533926_1618390866754_menu_disclosure_exo.png		2021-05-25 11:35:33.928	2021-05-25 11:35:33.928
131	1621942758111_1618389448345_form.PNG	/1621942758111_1618389448345_form.PNG		2021-05-25 11:39:18.115	2021-05-25 11:39:18.115
132	1622030142791_IMG_0909.JPG	/1622030142791_IMG_0909.JPG	\N	2021-05-26 11:55:43.477	2021-05-26 11:55:43.477
133	1622030284435_fred.jpg	/1622030284435_fred.jpg	\N	2021-05-26 11:58:04.485	2021-05-26 11:58:04.485
134	1622035668683_1618390591947_temperature2.PNG	/1622035668683_1618390591947_temperature2.PNG	\N	2021-05-26 13:27:48.695	2021-05-26 13:27:48.695
135	1622104198061_fix-exo.png	/1622104198061_fix-exo.png		2021-05-27 08:29:58.113	2021-05-27 08:29:58.113
136	1622111737406_drag-end.png	/1622111737406_drag-end.png	\N	2021-05-27 10:35:37.432	2021-05-27 10:35:37.432
137	1622117670939_drag-end.png	/1622117670939_drag-end.png		2021-05-27 12:14:30.962	2021-05-27 12:14:30.962
138	1622123081255_score-save.png	/1622123081255_score-save.png	\N	2021-05-27 13:44:41.326	2021-05-27 13:44:41.326
139	1622123141757_drag-end.png	/1622123141757_drag-end.png		2021-05-27 13:45:41.78	2021-05-27 13:45:41.78
140	1622130875356_set-results.png	/1622130875356_set-results.png	\N	2021-05-27 15:54:35.437	2021-05-27 15:54:35.437
141	1622130960444_exercise-score-1.png	/1622130960444_exercise-score-1.png		2021-05-27 15:56:00.494	2021-05-27 15:56:00.494
142	1622136984093_Diving_Two_Color.svg	/1622136984093_Diving_Two_Color.svg	\N	2021-05-27 17:36:24.095	2021-05-27 17:36:24.095
143	1622144932788_exerceise-score.png	/1622144932788_exerceise-score.png	\N	2021-05-27 19:48:53.099	2021-05-27 19:48:53.099
144	1622192320194_exerceise-score.png	/1622192320194_exerceise-score.png	\N	2021-05-28 08:58:42.279	2021-05-28 08:58:42.279
\.


--
-- TOC entry 3961 (class 0 OID 16531)
-- Dependencies: 219
-- Data for Name: possible_answer; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.possible_answer (id, content, correct, question_id, created_at, updated_at) FROM stdin;
29	lastError.focus() // déplacement de focus sur le dernier champ en erreur	f	8	2021-04-13 16:52:29.946	2021-04-13 16:57:59.499
2	alt="Bouton d'initialisation de la séquence d'allumage du moteur situé en haut à gauche du tableau de bord. Il s'agit du premier bouton en haut à gauche."	t	1	2021-04-12 09:41:17.674	2021-04-12 09:41:24.788
28	firstError.focus() // déplacement de focus sur premier champ en erreur	t	8	2021-04-13 16:51:16.948	2021-04-13 16:58:00.549
5	alt=""	t	2	2021-04-12 09:42:12.65	2021-04-12 09:42:16.316
37	closeBtn.focus();	f	10	2021-04-13 17:02:56.597	2021-05-25 10:13:42.969
1	alt=""	f	1	2021-04-12 09:41:11.336	2021-04-12 09:43:22.262
3	alt="Le bouton est rouge"	f	1	2021-04-12 09:41:29.621	2021-04-12 09:43:23.17
4	title="Le bouton se trouve sur le tableau de bord, en haut à gauche"	f	1	2021-04-12 09:41:35.671	2021-04-12 09:43:24.32
6	title="Photo du Nautilus"	f	2	2021-04-12 09:42:17.638	2021-04-12 09:43:40.82
7	alt="Photo du Nautilus"	f	2	2021-04-12 09:42:23.402	2021-04-12 09:43:41.982
8	aria-label="Photo du Nautilus"	f	2	2021-04-12 09:42:29.304	2021-04-12 09:43:43.359
9	fffff	t	3	2021-04-13 10:09:56.533	2021-04-13 10:10:00.961
10	aria-hidden=”true”	t	4	2021-04-13 15:48:21.245	2021-04-13 15:48:33.557
32	role=”dialog”	t	9	2021-04-13 17:01:20.176	2021-04-13 17:01:24.826
51	Test vraie	t	19	2021-05-16 12:11:23.193	2021-05-16 12:11:29.101
18	role=”img”	t	5	2021-04-13 15:50:34.645	2021-04-13 15:50:41.164
19	focusable=”false”	t	5	2021-04-13 15:50:41.317	2021-04-13 15:50:49.956
20	for="person-in-charge"	t	6	2021-04-13 15:53:59.213	2021-04-13 15:54:10.334
34	aria-modal=”true”	t	9	2021-04-13 17:01:36.693	2021-04-13 17:01:45.199
35	aria-labelledby=”modal-heading”	t	9	2021-04-13 17:01:46.327	2021-04-13 17:01:55.756
36	openingBtn.focus();	t	10	2021-04-13 17:02:35.813	2021-04-13 17:02:48.658
38	document.focus();	f	10	2021-04-13 17:02:59.894	2021-05-25 10:13:44.333
50	Test fausse	t	19	2021-05-16 12:11:17.524	2021-05-16 12:11:32.541
52	Test réponse fausse	t	20	2021-05-16 12:13:58.647	2021-05-16 12:14:07.367
11	aria-hidden=”false”	f	4	2021-04-13 15:48:33.7	2021-04-13 16:55:28.227
12	aria-label=””	f	4	2021-04-13 15:48:39.83	2021-04-13 16:55:30.006
13	role=”img”	f	4	2021-04-13 15:48:45.508	2021-04-13 16:55:31.371
17	aria-label=”100%”	t	5	2021-04-13 15:50:26.546	2021-05-25 07:59:44.224
15	aria-hidden=”true”	f	5	2021-04-13 15:50:11.982	2021-04-13 16:56:45.144
16	aria-hidden=”false”	f	5	2021-04-13 15:50:19.884	2021-04-13 16:56:46.352
21	aria-labelledby="person-in-charge"	f	6	2021-04-13 15:54:10.376	2021-04-13 16:57:11.929
22	for="captain-name"	f	6	2021-04-13 15:54:24.574	2021-04-13 16:57:16.105
23	aria-labelledby="error-start-code"	f	7	2021-04-13 16:45:24.443	2021-04-13 16:57:43.595
24	aria-describedby="start-code"	f	7	2021-04-13 16:45:46.473	2021-04-13 16:57:47.762
25	aria-describedby="error-start-code"	t	7	2021-04-13 16:46:05.749	2021-04-13 16:57:48.77
26	aria-label="Format du code saisi incorrect. Veuillez fournir le code de 8 chiffres comme 12345678."	f	7	2021-04-13 16:46:21.034	2021-04-13 16:57:50.717
27	for="error-start-code"	f	7	2021-04-13 16:49:01.292	2021-04-13 16:57:52.003
53	Test réponse vraie	t	20	2021-05-16 12:14:07.523	2021-05-16 12:14:13.198
54	Test réponse fausse 2	t	20	2021-05-16 12:15:50.427	2021-05-16 12:15:57.686
67	coucou	t	27	2021-05-17 18:13:38.115	2021-05-17 18:13:42.309
68	tutu	t	27	2021-05-17 18:13:42.816	2021-05-17 18:13:45.818
56	aaa	f	22	2021-05-16 12:39:45.455	2021-05-16 12:40:30.378
55	aTest réponse fausse	t	21	2021-05-16 12:18:27.178	2021-05-16 12:42:34.257
44	openingButton.setAttribute('aria-controls', 'menu-area');	t	11	2021-04-13 17:07:22.903	2021-04-13 17:07:50.129
30	aria-label=”Fenêtre modale”	f	9	2021-04-13 17:00:48.957	2021-05-25 09:06:24.356
33	aria-labelledby=”modal-confirm-delete”	f	9	2021-04-13 17:01:24.912	2021-04-14 08:41:14.924
31	role=”modal”	f	9	2021-04-13 17:01:06.991	2021-04-14 08:41:18.994
43	openingButton.setAttribute('aria-label', 'ouvert');	f	11	2021-04-13 17:06:46.792	2021-04-14 08:42:05.52
42	openingButton.setAttribute('aria-selected', false);	f	11	2021-04-13 17:06:27.467	2021-04-14 08:42:07.294
41	openingButton.setAttribute('aria-expanded', false);	f	11	2021-04-13 17:06:14.341	2021-04-14 08:42:09.977
40	openingButton.setAttribute('aria-expanded', true);	t	11	2021-04-13 17:06:01.769	2021-04-14 08:42:11.578
39	openingButton.setAttribute('aria-selected', true);	f	11	2021-04-13 17:05:17.297	2021-04-14 08:42:12.838
45	ddd	t	13	2021-04-20 16:01:31.134	2021-04-20 16:01:33.317
46	dd	t	13	2021-04-20 16:01:35.019	2021-04-20 16:01:37.017
47	ddd	t	13	2021-04-20 16:01:40.719	2021-04-20 16:01:42.997
48	Test réponse	t	18	2021-05-16 12:04:52.821	2021-05-16 12:04:59.989
49	Second test réponse	t	18	2021-05-16 12:05:00.002	2021-05-16 12:05:08.087
58		f	23	2021-05-16 12:45:51.187	2021-05-16 12:45:51.187
57	Test réponse fausse	f	23	2021-05-16 12:45:48.327	2021-05-16 12:45:59.255
59	Test réponse fausse	f	24	2021-05-16 12:47:17.163	2021-05-16 12:47:25.421
69	qsd	t	29	2021-05-17 20:35:24.235	2021-05-17 20:35:28.96
60	Test réponse vraie	t	24	2021-05-16 12:47:25.555	2021-05-16 12:48:02.955
61	réponse fausse 2	f	24	2021-05-16 12:48:20.015	2021-05-16 12:48:25.108
70	try	t	30	2021-05-18 08:01:06.201	2021-05-18 08:01:08.531
62	C'est vrai	t	25	2021-05-17 17:48:01.525	2021-05-17 17:48:07.509
63	c'est faux	f	25	2021-05-17 17:48:09.009	2021-05-17 17:48:13.101
64	c'est vrai aussi	t	25	2021-05-17 17:48:13.267	2021-05-17 17:48:19.213
71	rty	t	30	2021-05-18 08:01:08.902	2021-05-18 08:01:10.193
65	C'est vrai	t	26	2021-05-17 17:49:04.314	2021-05-17 17:50:11.021
66	c'est faux	f	26	2021-05-17 17:50:12.115	2021-05-17 17:50:16.635
76	je suis la mauvaise réponse	f	34	2021-05-21 06:52:17.441	2021-05-21 07:17:06.113
72	aa	t	31	2021-05-19 17:27:09.563	2021-05-19 17:27:13.864
75	je suis la bonne réponse	t	34	2021-05-21 06:52:07.916	2021-05-21 07:17:06.893
73	bb	t	32	2021-05-19 17:27:34.124	2021-05-19 17:27:39.768
74	cc	t	33	2021-05-19 17:27:59.871	2021-05-19 17:28:06.321
81	réponse vraie 1	t	36	2021-05-23 13:47:55.444	2021-05-23 13:48:04.552
77	réponse vraie	t	35	2021-05-23 13:46:05.161	2021-05-23 13:46:12.442
84	réponse fausse	f	36	2021-05-23 13:48:19.84	2021-05-23 13:48:26.619
78	réponse fausse 1	f	35	2021-05-23 13:46:14.526	2021-05-23 13:46:28.688
79	réponse fausse 2	f	35	2021-05-23 13:46:28.764	2021-05-23 13:47:00.783
80	réponse fausse 3	f	35	2021-05-23 13:47:00.954	2021-05-23 13:47:07.618
82	réponse vraie 2	t	36	2021-05-23 13:48:05.502	2021-05-23 13:48:12.06
83	réponse fausse	f	36	2021-05-23 13:48:13.033	2021-05-23 13:48:19.655
89	réponse1	f	38	2021-05-24 20:53:22.305	2021-05-24 20:53:28.135
14	focusable=”false”	t	4	2021-04-13 15:48:52.469	2021-05-25 07:36:18.802
88	réponse vraie 4	f	\N	2021-05-23 13:49:53.903	2021-05-23 13:50:01.618
85	réponse vraie 1	t	\N	2021-05-23 13:49:20.802	2021-05-23 13:49:26.59
86	réponse vraie 2	t	\N	2021-05-23 13:49:29.085	2021-05-23 13:49:44.68
87	réponse vraie 3	t	\N	2021-05-23 13:49:46.532	2021-05-23 13:49:53.047
90	Réponse2	t	38	2021-05-24 20:53:28.613	2021-05-24 20:53:33.077
92	réponse fausse	f	40	2021-05-27 08:30:33.194	2021-05-27 08:30:41.038
91	réponse vraie	t	40	2021-05-27 08:30:23.539	2021-05-27 08:30:32.177
93	réponse fausse	f	40	2021-05-27 08:30:42.994	2021-05-27 08:30:47.998
94	réponse fausse	f	40	2021-05-27 08:30:48.057	2021-05-27 08:30:56.753
96	réponse fausse	f	41	2021-05-27 08:31:44.25	2021-05-27 08:31:56.738
95	réponse vraie	t	41	2021-05-27 08:31:37.8	2021-05-27 08:31:42.687
97	réponse vraie	t	42	2021-05-27 08:50:14.621	2021-05-27 08:50:20.293
98	réponse fausse	f	42	2021-05-27 08:50:21.979	2021-05-27 08:50:26.684
99	Bonne réponse	t	43	2021-05-27 10:37:06.682	2021-05-27 10:37:12.695
100	Mauvaise réponse	f	43	2021-05-27 10:37:15.022	2021-05-27 10:37:21.266
101	Bonne réponse	t	45	2021-05-27 12:14:58.331	2021-05-27 12:15:03.514
102	Mauvaise	f	45	2021-05-27 12:15:04.238	2021-05-27 12:15:13.796
103	 Bonne réponse	t	46	2021-05-27 13:45:55.737	2021-05-27 13:46:03.585
104	Mauvaise réponse	f	46	2021-05-27 13:46:04.403	2021-05-27 13:46:09.131
105	Réponse 1	t	47	2021-05-27 15:56:34.946	2021-05-27 15:56:43.652
106		f	47	2021-05-27 15:56:44.532	2021-05-27 15:56:44.532
107	alt	t	48	2021-05-27 19:50:32.39	2021-05-27 19:50:40.916
108	rr	f	48	2021-05-27 19:50:42.587	2021-05-27 19:50:45.561
109	e	t	49	2021-05-28 09:00:47.716	2021-05-28 09:00:52.401
\.


--
-- TOC entry 3955 (class 0 OID 16483)
-- Dependencies: 213
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.question (id, brief, code, explanation, exercise_id, picture_id, created_at, updated_at) FROM stdin;
1	<p>Voici la première partie de la documentation qui pose problème.</p><p>Mon ingénieur en chef a besoin de savoir sur quel bouton appuyer pour lancer la séquence d'initialisation du moteur. Le texte à côté de l'image dit :</p><blockquote><p>le bouton de lancement de la séquence d'initialisation du moteur se trouve à l'endroit signalé dans l'image</p></blockquote><p>Le lecteur d'écran restitue seulement cette information :</p><blockquote><p>graphique path/initialisation-bouton20388347473636448837-8373626.jpg</p></blockquote><p>Le code de l'image en question figure ci-dessous et tu trouveras ensuite les options de réparations possibles que j'ai trouvé sur StackOverflow. Déplace la ou les solutions qui te semblent les bonnes.</p>	<div>\n  <img\n    src="path/initialisation-bouton20388347473636448837-8373626.jpg"\n    [[drop]]\n  />\n</div>\n	<p>L'image apporte une <strong>information nécessaire à la compréhension de la page</strong>.</p><p>L'attribut <strong>alt ne peut donc pas être vide</strong> puisque l'image ne serait pas restituée par le lecteur d'écran.</p><p>La mention “le bouton est rouge” n'est pas pertinente car elle ne permettra pas à une personne aveugle de trouver le bouton en question.</p><p>L'utilisation d'un attribut <strong>title</strong> pour fournir l'information n'est pas appropriée. En effet, l'attribut title, a fortiori sur un élément non interactif comme une image, <strong>risque de ne pas être restitué par le lecteur d'écran</strong>. Même si la description semble apporter toutes les informations nécessaires, dans la majorité des cas, l'utilisateur aveugle n'en bénéficiera pas.</p><p>La dernière solution est la bonne puisqu'elle se repose sur l'attribut alt et fournit toutes les informations nécessaires à la compréhension.</p>	1	101	2021-04-12 09:40:08.113	2021-05-16 15:28:50.954
9	<p>Il manque visiblement des attributs pour rendre cette fenêtre compatible avec les lecteurs d’écran mais je ne sais pas lesquels.</p>	<div class=”modal” id=”modal-confirm-delete” [[drop]] tabindex=”-1”>\n  <h1 id=”modal-heading”>Suppression du membre de l’équipage</h1>\n  <p>Souhaitez-vous vraiment supprimer le membre “Capitaine Némo” de l’équipage ?</p>\n</div>\n	<p>Pour rendre une fenêtre modale accessible aux lecteurs d'écran, il faut commencer par ajouter des attributs ARIA répondant à deux objectifs :</p><ul><li>Indiquer aux lecteurs d'écran qu'il s'agit d'une fenêtre modale,</li><li>Nommer la fenêtre modale,</li></ul><p> </p><p>L'attribut <strong>role</strong> sert à attribuer une <strong>sémantique</strong> à un élément. La <strong>valeur “modal” n'est pas valide</strong> pour l'attribut role, il faut utiliser la <strong>valeur “dialog”</strong> pour une fenêtre modale.</p><p>L'attribut <strong>aria-modal="true"</strong> sert à indiquer que la fenêtre modale capture le focus et que <strong>tant qu'elle est ouverte</strong>, l'utilisateur <strong>ne peut pas accéder au reste du contenu </strong>(par opposition à une fenêtre non-modale dont l'utilisateur peut sortir sans la fermer).</p><p>Pour <strong>attribuer un nom à la fenêtre modale</strong>, on utilise l'attribut <strong>aria-labelledby</strong> faisant <strong>référence</strong> à l'<strong>attribut id</strong> placé sur le titre (balise &lt;h1&gt;) de la fenêtre.</p><p>L'utilisation de l'attribut <strong>aria-label</strong> à la place de aria-labelledby est tout à fait <strong>possible</strong> mais la <strong>valeur “fenêtre modale” n'est pas pertinente </strong>puisqu'il s'agit de la sémantique de l'élément, déjà fournie par l'attribut role. </p>	11	128	2021-04-13 17:00:20.599	2021-05-25 11:34:24.428
11	<p>Quel attribut devrions-nous ajouter sur le bouton lorsque le menu est ouvert ?</p>	function openMenu(event) {\n const openingButton = event.target; // bouton qui contrôle l'ouverture et la fermeture du menu\n const menuArea = document.getElementById('main-menu'); // conteneur du menu, que l'on masque / affiche si nécessaire\n\n [[drop]]\n\n menuArea.classList.remove('hidden')  \n\n}\n	<p>L'attribut <strong>aria-selected</strong> sert à indiquer sur un élément est sélectionné ou non. Dans le cas présent, <strong>cela ne correspond pas réellement à la sémantique</strong> de l'état du composant. Cet attribut sera plutôt utilisé dans une système d'onglets par exemple.</p><p>L'attribut <strong>aria-label écrase le nom accessible de l'élément</strong>. S'il est utilisé sur ce bouton, avec la valeur “ouvert”, le bouton s'appellera désormais “ouvert” et non plus menu. Ce n'est donc pas un choix pertinent ici.</p><p>L'attribut <strong>aria-expanded</strong> sert à définir si la zone contrôlée par le bouton est <strong>affichée ou masquée</strong>. C'est donc cet attribut qui est à utiliser dans ce cas. La valeur par défaut devrait être laissée à <strong>false</strong>, pour indiquer que le bouton contrôle une zone et que celle-ci est <strong>masquée</strong>. Lorsque la zone est <strong>affichée</strong>, il faut passer l'attribut à <strong>true</strong>.</p><p>Enfin, l'attribut <strong>aria-controls</strong> sert à <strong>lier la zone contrôlée au bouton</strong>. Cela permet de fournir un <strong>raccourci pour passer facilement du bouton à la zone</strong> contrôlée avec un lecteur d'écran. Actuellement, cet attribut n'est exploité que par le lecteur d'écran JAWS. Pour fonctionner, <strong>aria-controls</strong> prend la valeur de l'attribut <strong>id</strong> <strong>placé sur la zone contrôlée</strong>.</p><p> </p><p> </p>	12	130	2021-04-13 17:04:12.993	2021-05-25 11:35:33.95
41	<p>aaa</p>	<a href="toto" [[drop]]>toto</a>		\N	\N	2021-05-27 08:31:02.27	2021-05-27 08:31:37.739
44				\N	\N	2021-05-27 10:37:27.29	2021-05-27 10:37:27.29
34	<p>coucou</p>	blabla [[drop]] blabla	<p>je suis la correction</p>	\N	119	2021-05-21 06:48:38.458	2021-05-21 07:16:18.524
47	<p>aoi</p>	<img [[drop]] />		\N	\N	2021-05-27 15:55:33.535	2021-05-27 15:56:34.882
8	<p>En plus du problème cité précédemment, quand il clique sur le bouton d’envoi, rien ne se passe. Les messages sont affichés visuellement mais il n’en est pas informé. Je pense qu’il faudrait déplacer le focus pour l’informer mais je ne sais pas où.</p>	onError() {\n  [[drop]]\n}	<p>En cas d'erreur dans un formulaire, <strong>il faut déplacer le focus de l'utilisateur sur le premier champ en erreur</strong>. Cela permet à l'utilisateur de consulter les erreurs suivantes, dans l'ordre.</p><p>En déplaçant le focus sur le dernier champ, l'utilisateur aveugle n'aura pas forcément connaissance des champs précédents qui contiennent des erreurs.</p>	9	\N	2021-04-13 16:49:22.475	2021-05-25 09:05:47.863
3	<p>fffff</p>	ffffff	<p>fffffff</p>	\N	\N	2021-04-13 10:09:50.314	2021-04-13 10:10:05.862
5	<p>Sur cette page, le % de la puissance actuelle est indiqué dans une image svg mais cette dernière est restituée “groupe, vide” par le lecteur d’écran du chef mécanicien. Il n’a donc pas accès à cette information.</p>	<li>\n puissance actuelle: \n <svg width="1920" height="150" preserveAspectRatio="none" viewBox="0 0 1920 150" [[drop]]>\n  ...\n </svg>\n<li>	<p>L'attribut <strong>aria-hidden</strong> avec la <strong>valeur true</strong> sert à masquer un élément pour les lecteurs d'écran. La <strong>valeur false</strong> revient à ne pas mettre d'attribut aria-hidden, le contenu sera restitué par les lecteurs d'écran.</p><p>L'attribut <strong>role="img"</strong> sert à s'assurer que l'élément soit restitué comme une image.</p><p>L'attribut <strong>focusable="false"</strong> sert à empêcher la touche tabulation d'accéder à la balise<strong> &lt;svg&gt;</strong>. Ce n'est normalement pas nécessaire mais sur Internet Explorer, par défaut, les balises<strong> &lt;svg&gt;</strong> sont accessibles à la tabulation, à tort. C'est donc pour régler ce bug que l'on utilise cet attribut.</p><p>Dans le cas présent, l'image apporte une information, on doit donc utilister l'attribut<strong> role="img"</strong> sur la balise<strong> &lt;svg&gt;</strong> pour qu'elle soit reconnue comme une image. On ajoute également l'information à restituer grâce à l'attribut aria-label="100%". Enfin, on ajoute un attribut <strong>focusable="false" </strong>pour régler le bug d'Internet Explorer.</p><p>L'attribut <strong>aria-hidden est inutile</strong> dans ce cas puisque l'on souhaite que le contenu soit restitué et que la valeur <strong>false</strong> revient à ne pas mettre l'attribut.</p>	6	127	2021-04-13 15:49:29.162	2021-05-25 11:32:23.653
39		<img [[drop]] />		36	\N	2021-05-25 16:41:48.991	2021-05-25 16:42:23.234
10	<p>Lorsque la fenêtre se ferme, ma sous-officière est perdue. Le focus n’est pas déplacé et puisqu’il se trouvait dans la fenêtre qui n’existe plus une fois fermée, elle est tout simplement perdue.</p><p>Où pourrions-nous replacer le focus ?</p>	function closeModal() {\n  const openingBtn = document.getElementById(‘btn-open-modal’); // le bouton qui sert à afficher la modale\n  const closeBtn =  document.getElementById(‘btn-close-modal’); // le bouton qui sert à fermer la modale\n  \n  [[drop]]  \n}	<p>Une fenêtre modale peut être vue comme une <strong>pause dans la navigation de l'utilisateur</strong>. Tant que la fenêtre est ouverte, l'utilisateur n'a accès qu'au contenu de celle-ci.</p><p>Lorsque l'utilisateur ferme cette fenêtre, il faut donc qu'il puisse <strong>reprendre sa navigation là où il était</strong>. A la <strong>fermeture de la fenêtre</strong>, on replace donc l'utilisateur sur le <strong>bouton qui a permis de l'ouvrir</strong>.</p>	11	129	2021-04-13 17:02:13.663	2021-05-25 11:34:32.306
35	<p>Le brief de la question 1</p>	<du faux code>\n[[drop]]\n<du faux code />	<p>correction question 1</p>	66	\N	2021-05-23 13:44:49.427	2021-05-23 13:57:52.07
45	<p>Questioj</p>	<img [[drop]] />		\N	\N	2021-05-27 12:14:20.855	2021-05-27 12:14:51.581
38	<p>test</p>	[[drop]]		69	\N	2021-05-24 20:53:05.244	2021-05-24 20:53:21.691
42	<p>Brief question 1</p>	<img [[drop]] />	<p>Explication</p>	\N	\N	2021-05-27 08:49:20.902	2021-05-27 08:50:30.789
13	<p>dd</p>	ddddd	<p>ddd</p>	\N	\N	2021-04-20 16:01:16.616	2021-04-20 16:01:38.717
12	<p>test</p>			\N	\N	2021-04-20 14:52:02.158	2021-04-20 15:17:32.259
14				\N	73	2021-04-22 09:39:31.156	2021-04-22 11:25:06.123
48	<p>ozu</p>	<img [[drop]] />	<p>aaa</p>	\N	\N	2021-05-27 19:50:05.263	2021-05-27 19:50:54.446
15	<p>test</p>			\N	78	2021-04-22 11:44:04.315	2021-04-22 12:30:09.306
16	<p>test</p>			\N	88	2021-04-29 10:32:50.535	2021-04-29 10:33:03.19
17				\N	93	2021-04-29 10:37:04.925	2021-04-29 11:15:35.979
27	<p>test</p>	[[drop]]	<p>explicaitoj</p>	\N	106	2021-05-17 18:13:28.463	2021-05-17 18:13:59.105
18	<p>Blabla</p>			\N	\N	2021-05-16 12:04:43.134	2021-05-16 12:04:52.73
19				\N	\N	2021-05-16 12:11:12.785	2021-05-16 12:11:12.785
20				\N	\N	2021-05-16 12:13:55.527	2021-05-16 12:13:55.527
22				\N	\N	2021-05-16 12:39:42.313	2021-05-16 12:39:42.313
21				\N	\N	2021-05-16 12:18:18.028	2021-05-16 12:18:18.028
23				\N	\N	2021-05-16 12:45:45.319	2021-05-16 12:45:45.319
24				\N	\N	2021-05-16 12:47:08.574	2021-05-16 12:47:08.574
30	<p>toto</p>	[[drop]]		\N	\N	2021-05-18 08:00:52.071	2021-05-18 08:02:14.9
33	<p>cc</p>	cc [[drop]] cc	<p>cc</p>	\N	\N	2021-05-19 17:27:46.92	2021-05-19 17:28:10.976
31	<p>aaa</p>	aa [[drop]] aa	<p>aa</p>	\N	\N	2021-05-19 17:26:55.725	2021-05-19 17:27:20.838
32	<p>bb</p>	bb [[drop]] bb	<p>bb</p>	\N	\N	2021-05-19 17:27:20.978	2021-05-19 17:27:46.765
25	<p>wahou</p>	<p [[drop]]>test</p>	<p>C'était facile</p>	\N	\N	2021-05-17 17:47:22.183	2021-05-17 20:07:40.563
26	<p>Blabla</p>	<p [[drop]]>test</p>	<p>youpii</p>	\N	\N	2021-05-17 17:48:33.147	2021-05-17 20:10:05.78
7	<p>Sur la page, des messages d’erreur s’affichent mais ils ne sont pas restitués par le lecteur d’écran lorsqu’il passe de champ en champ.</p>	<label for="start-code">Code de démarrage</label>\n<input id="start-code" [[drop]] />\n<p id="error-start-code">Format du code saisi incorrect. Veuillez fournir le code de 8 chiffres comme "12345678".</p>	<p>La solution <strong>aria-label</strong> n'est pas pertinente puisque <strong>cet attribut écrase le nom accessible déjà fourni</strong> (étiquette “Code de démarrage” reliée par for / id).</p><p>La solution <strong>aria-labelledby présente le même problème</strong>.</p><p>La solution <strong>for="error-start-code"</strong> n'a pas de sens dans ce contexte puisqu'un <strong>attribut for se place sur une étiquette et non sur un champ</strong>.</p><p>Tous les <strong>attributs cités ci-dessus servent à nommer un champ</strong> alors qu'ici, nous <strong>souhaitons apporter des informations complémentaires</strong> sur le champ et non le nommer.</p><p>Il faut donc utiliser l'attribut <strong>aria-describedby</strong> en veillant bien à faire <strong>référence</strong> à la valeur de<strong> l'attribut id</strong> placé sur le conteneur du message d'erreur.</p>	9	\N	2021-04-13 16:25:12.06	2021-05-25 09:03:14.727
36	<p>Le brief de la question 2</p>	<du faux code>\n[[drop]]\n<du faux code />	<p>Correction de la question 2</p>	66	\N	2021-05-23 13:47:19.35	2021-05-23 13:48:35.176
29	<p>test</p>	[[drop]]		\N	\N	2021-05-17 20:35:13.612	2021-05-17 20:35:23.991
40	<p>Brief question 1</p>	<img [[drop]] />	<p>Explicaition</p>	\N	\N	2021-05-27 08:29:43.847	2021-05-27 08:31:02.212
43	<p>tite</p>	<img [[drop]] />	<p>e</p>	\N	\N	2021-05-27 10:36:41.082	2021-05-27 10:37:25.154
46	<p>or</p>	<img [[drop]] />		\N	\N	2021-05-27 13:45:33.441	2021-05-27 13:45:55.684
49	<p>oiu</p>	<img [[drop]] />	<p>aaa</p>	82	\N	2021-05-28 09:00:11.415	2021-05-28 09:00:58.096
2	<p>La seconde partie de la documentation comporte une autre image accompagnant le texte mais mon ingénieur en chef ne pouvant pas la voir, il ne sait pas si cette dernière apporte une information ou non.</p>	<div>\n  <img\n    src="path/nautilus-magnifyque.jpg"\n    [[drop]]\n  />\n <p>Le Nautilus est équipé de torpilles turbolaser dernier cri</p>\n <p>Les torpilles turbolasers sont initialisées automatiquement. Elles ne peuvent être utilisées que par la personne habilitée. Par défaut, il s'agit du capitaine mais ce dernier peut nommer un torpilleur et lui transférer les droits.</p>\n</div>\n	<p>L'image n'apporte aucune information et elle ne devrait donc pas être restituée par le lecteur d'écran.</p><p>L'utilisation d'un attribut <strong>aria-label</strong> sur une balise<strong> &lt;img&gt;</strong> est possible mais <strong>inutile dans la majorité des cas</strong>. Cet attribut sert à donner un <strong>nom accessible à un élément</strong>. C'est ce nom qui sera restitué par les lecteurs d'écran. Les balises <strong>&lt;img&gt;</strong> disposent déjà d'un <strong>attribut natif</strong> qui remplit exactement ce rôle, à savoir <strong>l'attribut alt</strong>. L'image en question n'apporte aucune information donc l'attribut aria-label n'a aucun lieu d'être dans ce cas.</p><p>Puisque l'image n'apporte <strong>aucune information</strong>, l'attribut <strong>alt devrait être laissé vide</strong>.</p>	1	125	2021-04-12 09:41:50.958	2021-05-25 11:29:36.415
4	<p>Tu trouveras ci-dessous un exemple et des solutions possibles. Trouve les attributs à ajouter et nous les ajouterons ensuite sur tous les cas similaires.</p>	<li>\n <svg width="1920" height="150" preserveAspectRatio="none" viewBox="0 0 1920 150" [[drop]]>\n  ...\n </svg>\n <span>Température : 100°C</span>\n<li>\n	<p>L'attribut <strong>aria-hidden</strong> avec la <strong>valeur true</strong> sert à masquer un élément pour les lecteurs d'écran. La valeur false revient à ne pas mettre d'attribut aria-hidden, le contenu sera restitué par les lecteurs d'écran.</p><p>L'attribut <strong>role="img"</strong> sert à s'assurer que l'élément soit restitué comme une image. Dans le cas présent, il ne faut pas l'utiliser puisqu'on ne souhaite pas restituer ce contenu.</p><p>L'attribut <strong>focusable="false"</strong> sert à empêcher la touche tabulation d'accéder à la balise<strong> &lt;svg&gt;</strong>. Ce n'est normalement pas nécessaire mais sur Internet Explorer, par défaut, les balises<strong> &lt;svg&gt;</strong> sont accessibles à la tabulation, à tort. C'est donc pour régler ce bug que l'on utilise cet attribut.</p><p>Dans le cas présent, l'image n'apporte aucune information, on doit donc utilister l'attribut<strong> aria-hidden="true"</strong> sur la balise<strong> &lt;svg&gt;</strong> et l'accompagner d'un attribut <strong>focusable="false" </strong>pour régler le bug d'Internet Explorer.</p>	6	126	2021-04-13 15:45:29.673	2021-05-25 11:32:08.259
6	<p>Dans cette première interface, il y a un champ de formulaire “Nom du capitaine” mais visiblement, ce champ <strong>n'a pas été correctement relié à son étiquette</strong>. En effet, le logiciel de reconnaissance vocale ne parvient pas à y accéder lorsqu'on le lui demande.</p>	<label [[drop]]>Nom du capitaine</label>\n<input id="person-in-charge" type="text" name="captain-name" />\n	<p>L'attribut <strong>aria-labelledby</strong> sert à fournir un <strong>nom accessible</strong> à un élément. Le nom accessible est le nom qui <strong>sera obligatoirement restitué</strong> par les lecteurs d'écran. Il fonctionne par <strong>référence</strong> à la valeur de <strong>attribut id</strong> placé sur le conteneur du texte à restituer. Contrairement à l'attribut <strong>for</strong>, l'attribut <strong>aria-labelledby se place sur l'élément à nommer</strong> et fait référence à l'attribut <strong>id </strong>présent sur l'étiquette.</p><p>L'attribut <strong>for</strong> sert également à fournir un nom accessible à un élément mais il ne fonctionne que sur les étiquettes de champs de formulaires. L'attribut <strong>for</strong> se place sur <strong>une étiquette et fait référence à la valeur d'un attribut id placé sur un champ de formulaire</strong>.</p><p>La <strong>bonne réponse était for="person-in-charge"</strong> puisque la valeur de l'attribut for correspond bien à celle de l'attribut id du champ.</p>	7	131	2021-04-13 15:53:23.813	2021-05-25 11:39:18.133
\.


--
-- TOC entry 3945 (class 0 OID 16413)
-- Dependencies: 203
-- Data for Name: responsibility; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.responsibility (id, entitled, created_at, updated_at) FROM stdin;
1	utilisateur	2021-03-31 13:09:02.809313	\N
2	admin	2021-03-31 13:09:02.809313	\N
\.


--
-- TOC entry 3959 (class 0 OID 16520)
-- Dependencies: 217
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.theme (id, name, color, created_at, updated_at) FROM stdin;
2	Cadres	#495CFA	2021-03-31 13:09:02.952896	\N
3	Couleurs	#28AFFA	2021-03-31 13:09:02.952896	\N
4	Multimédia	#21FAF8	2021-03-31 13:09:02.952896	\N
8	Éléments obligatoires	#E0FA3A	2021-03-31 13:09:02.952896	\N
9	Structuration de l'information	#FADD3A	2021-03-31 13:09:02.952896	\N
10	Présentation de l'information	#FAA335	2021-03-31 13:09:02.952896	\N
12	Navigation	#FA4488	2021-03-31 13:09:02.952896	\N
13	Consultation	#C83CFA	2021-03-31 13:09:02.952896	\N
1	Image	#8c1a96	2021-03-31 13:09:02.952896	\N
11	Formulaires	#d9094d	2021-03-31 13:09:02.952896	\N
5	Tableaux	#33b565	2021-03-31 13:09:02.952896	\N
6	Liens	#33b565	2021-03-31 13:09:02.952896	\N
7	Scripts	#33b565	2021-03-31 13:09:02.952896	\N
\.


--
-- TOC entry 3967 (class 0 OID 16583)
-- Dependencies: 225
-- Data for Name: theme_doc; Type: TABLE DATA; Schema: public; Owner: cod_access_user
--

COPY public.theme_doc (id, theme_id, doc_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3976 (class 0 OID 0)
-- Dependencies: 222
-- Name: client_doc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.client_doc_id_seq', 1, false);


--
-- TOC entry 3977 (class 0 OID 0)
-- Dependencies: 220
-- Name: client_exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.client_exercise_id_seq', 30, true);


--
-- TOC entry 3978 (class 0 OID 0)
-- Dependencies: 206
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.client_id_seq', 26, true);


--
-- TOC entry 3979 (class 0 OID 0)
-- Dependencies: 214
-- Name: doc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.doc_id_seq', 1, false);


--
-- TOC entry 3980 (class 0 OID 0)
-- Dependencies: 210
-- Name: exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.exercise_id_seq', 82, true);


--
-- TOC entry 3981 (class 0 OID 0)
-- Dependencies: 226
-- Name: exercise_theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.exercise_theme_id_seq', 41, true);


--
-- TOC entry 3982 (class 0 OID 0)
-- Dependencies: 208
-- Name: kind_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.kind_id_seq', 2, true);


--
-- TOC entry 3983 (class 0 OID 0)
-- Dependencies: 204
-- Name: picture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.picture_id_seq', 144, true);


--
-- TOC entry 3984 (class 0 OID 0)
-- Dependencies: 218
-- Name: possible_answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.possible_answer_id_seq', 109, true);


--
-- TOC entry 3985 (class 0 OID 0)
-- Dependencies: 212
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.question_id_seq', 49, true);


--
-- TOC entry 3986 (class 0 OID 0)
-- Dependencies: 202
-- Name: responsibility_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.responsibility_id_seq', 2, true);


--
-- TOC entry 3987 (class 0 OID 0)
-- Dependencies: 224
-- Name: theme_doc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.theme_doc_id_seq', 1, false);


--
-- TOC entry 3988 (class 0 OID 0)
-- Dependencies: 216
-- Name: theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cod_access_user
--

SELECT pg_catalog.setval('public.theme_id_seq', 13, true);


--
-- TOC entry 3798 (class 2606 OID 16570)
-- Name: client_doc client_doc_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client_doc
    ADD CONSTRAINT client_doc_pkey PRIMARY KEY (id);


--
-- TOC entry 3796 (class 2606 OID 16552)
-- Name: client_exercise client_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client_exercise
    ADD CONSTRAINT client_exercise_pkey PRIMARY KEY (id);


--
-- TOC entry 3782 (class 2606 OID 16443)
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- TOC entry 3790 (class 2606 OID 16512)
-- Name: doc doc_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.doc
    ADD CONSTRAINT doc_pkey PRIMARY KEY (id);


--
-- TOC entry 3786 (class 2606 OID 16475)
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (id);


--
-- TOC entry 3802 (class 2606 OID 16606)
-- Name: exercise_theme exercise_theme_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.exercise_theme
    ADD CONSTRAINT exercise_theme_pkey PRIMARY KEY (id);


--
-- TOC entry 3784 (class 2606 OID 16464)
-- Name: kind kind_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.kind
    ADD CONSTRAINT kind_pkey PRIMARY KEY (id);


--
-- TOC entry 3780 (class 2606 OID 16432)
-- Name: picture picture_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.picture
    ADD CONSTRAINT picture_pkey PRIMARY KEY (id);


--
-- TOC entry 3794 (class 2606 OID 16539)
-- Name: possible_answer possible_answer_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.possible_answer
    ADD CONSTRAINT possible_answer_pkey PRIMARY KEY (id);


--
-- TOC entry 3788 (class 2606 OID 16491)
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- TOC entry 3778 (class 2606 OID 16421)
-- Name: responsibility responsibility_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.responsibility
    ADD CONSTRAINT responsibility_pkey PRIMARY KEY (id);


--
-- TOC entry 3800 (class 2606 OID 16588)
-- Name: theme_doc theme_doc_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.theme_doc
    ADD CONSTRAINT theme_doc_pkey PRIMARY KEY (id);


--
-- TOC entry 3792 (class 2606 OID 16528)
-- Name: theme theme_pkey; Type: CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (id);


--
-- TOC entry 3812 (class 2606 OID 16571)
-- Name: client_doc client_doc_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client_doc
    ADD CONSTRAINT client_doc_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) ON DELETE CASCADE;


--
-- TOC entry 3813 (class 2606 OID 16576)
-- Name: client_doc client_doc_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client_doc
    ADD CONSTRAINT client_doc_doc_id_fkey FOREIGN KEY (doc_id) REFERENCES public.doc(id) ON DELETE CASCADE;


--
-- TOC entry 3810 (class 2606 OID 16553)
-- Name: client_exercise client_exercise_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client_exercise
    ADD CONSTRAINT client_exercise_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) ON DELETE CASCADE;


--
-- TOC entry 3811 (class 2606 OID 16558)
-- Name: client_exercise client_exercise_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client_exercise
    ADD CONSTRAINT client_exercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE CASCADE;


--
-- TOC entry 3804 (class 2606 OID 16449)
-- Name: client client_picture_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_picture_id_fkey FOREIGN KEY (picture_id) REFERENCES public.picture(id) ON DELETE SET DEFAULT;


--
-- TOC entry 3803 (class 2606 OID 16444)
-- Name: client client_responsibility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_responsibility_id_fkey FOREIGN KEY (responsibility_id) REFERENCES public.responsibility(id);


--
-- TOC entry 3808 (class 2606 OID 16513)
-- Name: doc doc_picture_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.doc
    ADD CONSTRAINT doc_picture_id_fkey FOREIGN KEY (picture_id) REFERENCES public.picture(id) ON DELETE SET NULL;


--
-- TOC entry 3805 (class 2606 OID 16476)
-- Name: exercise exercise_kind_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_kind_id_fkey FOREIGN KEY (kind_id) REFERENCES public.kind(id) ON DELETE SET NULL;


--
-- TOC entry 3816 (class 2606 OID 16607)
-- Name: exercise_theme exercise_theme_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.exercise_theme
    ADD CONSTRAINT exercise_theme_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE CASCADE;


--
-- TOC entry 3817 (class 2606 OID 16612)
-- Name: exercise_theme exercise_theme_theme_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.exercise_theme
    ADD CONSTRAINT exercise_theme_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.theme(id) ON DELETE CASCADE;


--
-- TOC entry 3809 (class 2606 OID 16540)
-- Name: possible_answer possible_answer_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.possible_answer
    ADD CONSTRAINT possible_answer_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question(id) ON DELETE SET NULL;


--
-- TOC entry 3806 (class 2606 OID 16492)
-- Name: question question_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE SET NULL;


--
-- TOC entry 3807 (class 2606 OID 16497)
-- Name: question question_picture_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_picture_id_fkey FOREIGN KEY (picture_id) REFERENCES public.picture(id) ON DELETE SET NULL;


--
-- TOC entry 3815 (class 2606 OID 16594)
-- Name: theme_doc theme_doc_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.theme_doc
    ADD CONSTRAINT theme_doc_doc_id_fkey FOREIGN KEY (doc_id) REFERENCES public.doc(id) ON DELETE CASCADE;


--
-- TOC entry 3814 (class 2606 OID 16589)
-- Name: theme_doc theme_doc_theme_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cod_access_user
--

ALTER TABLE ONLY public.theme_doc
    ADD CONSTRAINT theme_doc_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.theme(id) ON DELETE CASCADE;


--
-- TOC entry 3975 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2021-06-22 11:52:25 CEST

--
-- PostgreSQL database dump complete
--

