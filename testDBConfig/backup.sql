--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-09 11:52:12

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
-- TOC entry 215 (class 1259 OID 16408)
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    nit text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    phone text NOT NULL
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16429)
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    "articleName" text NOT NULL,
    "companyId" text NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16400)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email text NOT NULL,
    password text NOT NULL,
    "userType" text DEFAULT 'USER'::text NOT NULL,
    token text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3184 (class 2606 OID 16414)
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (nit);


--
-- TOC entry 3186 (class 2606 OID 16435)
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY ("articleName", "companyId");


--
-- TOC entry 3182 (class 2606 OID 16407)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- TOC entry 3187 (class 2606 OID 16436)
-- Name: inventory company; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT company FOREIGN KEY ("companyId") REFERENCES public.companies(nit);


-- Completed on 2023-03-09 11:52:13

--
-- PostgreSQL database dump complete
--

