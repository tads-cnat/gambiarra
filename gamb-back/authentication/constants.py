class GrupoEnum:
    GERENTE = "gerente"
    PROFESSOR = "professor"
    BOLSISTA = "bolsista"

    SERVIDOR = "servidor"
    CLIENTE = "cliente"
    ALUNO = "aluno"

    INTERNO = (GERENTE, PROFESSOR, BOLSISTA)
    EXTERNO = (SERVIDOR, CLIENTE, ALUNO)
    STAFF = (GERENTE, PROFESSOR)
