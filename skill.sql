--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entries (
    title character varying(255),
    content text
);


ALTER TABLE public.entries OWNER TO postgres;

--
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries (title, content) FROM stdin;
Diary Entry	Leave me alone!
Diary Entry	Trying to save another entry, hehe!
Diary Entry	Better cash out until the walls cave in.
Diary Entry	Today has been a weird day so far, I get this jolt of hyperventilation once my imaginary power and capacity to make up fake conversations with people goes away. I use my mind as a means of self-expression. Thought with thoughts. Terrible strategy.
Diary Entry	Thinking about my childhood a lot. How I loved riding bikes and that leading up to some thrill-based pursuits. I very much invoke that same neural circuit in regards to pursuing relationships, to an eerie obscene degree.
Diary Entry	Hyper-awareness comes out as my imagination subdues.
Diary Entry	I think the two main traits I have is being quiet and weird, my question-based attitude is largely an anxiety, an obnoxious attention grabbing and personal avoidance. By casting the awareness of intrapersonal communication away from myself, I protect myself from potentially threatening conversations.
Diary Entry	Unfortunately, I am more interesting in acting like I am doing something than genuinely doing something.
Diary Entry	When I let go of the idea of being watched over, the world turns into a hyper-aware paranoid freak-show. Everything hurts, everything is a dagger, everything is a trigger.
Diary Entry	It's very easy to set me off, and my reactions are extreme. This makes it hard to tinker with my brain and how it works.
Diary Entry	Things are really clicking today. Abandoning my pride and ego are key moves.
Diary Entry	Things are really clicking today. Abandoning my pride and ego are key moves.
Diary Entry	I think this app doesn't work very well. And I'm not sure what functionality I am even aiming for at the moment.
Diary Entry	John Vervaeke is just like me fr!
Diary Entry - 6/2/2023	
Diary Entry - 6/2/2023	I don't see how there's that much left to examine anymore. But there always is. Mood swings go hard. I think it's a result of my uncalibrated brain. Calibrating it requires meditation, letting go, dropping desires, and arriving to a place of loving reality.
Diary Entry - 6/4/2023	I really like somehow flexing or showing off my tastes. A lot of repetitive themes all throughout my life, I suppose I wouldn't really know how to even breathe without the imaginary audience in my mind. It's a really pervasive hidden 
Diary Entry - 6/4/2023	I really like somehow flexing or showing off my tastes. A lot of repetitive themes all throughout my life, I suppose I wouldn't really know how to even breathe without the imaginary audience in my mind. It's a really pervasive hidden barely visible issue, I mean I wouldn't really tell anyone about it because I wouldn't know where to start. I feel a stark sense of loneliness once I am without those daydream induced fake attentions.
Diary Entry - 6/4/2023	I don't know what this is, but it's kind of hot.
Diary Entry - 6/4/2023	ddd
Diary Entry - 6/4/2023	
Diary Entry - 6/4/2023	PArasty
\.


--
-- PostgreSQL database dump complete
--

