import { userRoles } from "../auth/roles";
import { getUserActiveRole } from "../auth/service/AuthStore";

/**
 * Verifica se o utilizador ativo tem um papel EXTERNO
 * (cliente, aluno ou servidor externo)
 */
export const isUserExternal = (): boolean =>
  Object.values(userRoles.EXTERNO).includes(getUserActiveRole());

/**
 * Verifica se o utilizador ativo tem um papel INTERNO
 * (gerente, professor ou bolsista)
 */
export const isUserInternal = (): boolean =>
  Object.values(userRoles.INTERNO).includes(getUserActiveRole());

/**
 * Verifica se o utilizador ativo é bolsista
 */
export const isUserBolsista = (): boolean =>
  getUserActiveRole() === userRoles.INTERNO.BOLSISTA;

/**
 * Verifica se o utilizador ativo é professor
 */
export const isUserProfessor = (): boolean =>
  getUserActiveRole() === userRoles.INTERNO.PROFESSOR;

/**
 * Verifica se o utilizador ativo é gerente
 */
export const isUserGerente = (): boolean =>
  getUserActiveRole() === userRoles.INTERNO.GERENTE;

/**
 * Verifica se o utilizador ativo é servidor (EXTERNO)
 */
export const isUserServidor = (): boolean =>
  getUserActiveRole() === userRoles.EXTERNO.SERVIDOR;

/**
 * Verifica se o utilizador ativo é cliente
 */
export const isUserCliente = (): boolean =>
  getUserActiveRole() === userRoles.EXTERNO.CLIENTE;

/**
 * Verifica se o utilizador ativo é aluno
 */
export const isUserAluno = (): boolean =>
  getUserActiveRole() === userRoles.EXTERNO.ALUNO;
