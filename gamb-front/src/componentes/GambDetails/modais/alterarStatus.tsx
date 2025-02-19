import { useForm } from "react-hook-form";
import ChamadoService from "../../../services/models/ChamadoService";
import GambButton from "../../GambButton/Button";
import { ModalCard, ModalFooter, ModalHeader, ModalOverlay } from "../../GambModal/modalstyles";
import { SelectField } from "../../GambSelect/Select";

interface FormValues {
  status: number;  // Tipagem para o campo de select
}

export default function AlterarStatusModal(props: {
  chamadoId: number | null;
  isModalOpen: boolean;
  closeModal: () => void;
}) {

  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>();
  const { isModalOpen, closeModal, chamadoId } = props;

  async function onSubmit(values: FormValues): Promise<void> {
    if (!chamadoId) return;  // Verifica se chamadoId é válido

    ChamadoService.alterarStatus(chamadoId, String(values.status))  // Altera o status
      .then(() => {
        alert("Status alterado com sucesso");
      })
      .catch(() => {
        console.error("Erro ao alterar status do chamado");
      })
 
  }

  if (isModalOpen) {
    return (
      <>
        <ModalOverlay onClick={closeModal}>
          <ModalCard onClick={(e) => e.stopPropagation()} className="elevacao-def">
            <ModalHeader>
              <h3>Alterar Status</h3>
            </ModalHeader>

            <form style={{ marginTop: "8px"}} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-2 mt-0 justify-center items-center">
              <SelectField
                label="Status"
                placeholder="Selecione um status"
                register={register("status", { required: true })}  // Adicionando a validação necessária
                defaultValue=""
                styels={{ width: "100%" }}
              />
              {errors.status && <p style={{ color: 'red' }}>Este campo é obrigatório</p>}  {/* Exibe erro se não for preenchido */}

              <ModalFooter>
                <GambButton
                label="Alterar"
                  type="submit"
                  variant="verde"
                  size="large"
                />
                <GambButton
                  label="Cancelar"
                  type="button"
                  variant="inline"
                  size="large"
                  onClick={closeModal}
                />
              </ModalFooter>
            </form>
          </ModalCard>
        </ModalOverlay>
      </>
    );
  }

  return null;  // Retorna null quando o modal não está aberto
}
