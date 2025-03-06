import { useForm } from "react-hook-form";
import ChamadoService from "../../../services/models/ChamadoService";
import GambButton from "../../GambButton/Button";
import { ModalCard, ModalFooter, ModalHeader, ModalOverlay } from "../../GambModal/modalstyles";
import { SelectField } from "../../GambSelect/Select"; // Importe o statusChamado

interface FormValues {
  status: number;
}

export default function AlterarStatusModal(props: {
  chamadoId: number | null;
  isModalOpen: boolean;
  closeModal: () => void;
  stats?: string; // Status atual como string
}) {

  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>();
  const { isModalOpen, closeModal, chamadoId, stats } = props;

  async function onSubmit(values: FormValues): Promise<void> {
    if (!chamadoId) return;

    ChamadoService.alterarStatus(chamadoId, String(values.status))
      .then(() => {
        alert("Status alterado com sucesso");
        closeModal();
      })
      .catch(() => {
        console.error("Erro ao alterar status do chamado");
      })
      .finally(() => {
        window.location.reload();
      });
  }

  console.log(stats)

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
                register={register("status", { required: true })}
                defaultValue=""
                styles={{ width: "100%" }}
                status={stats} // Passando a string do status atual
              />
              {errors.status && <p style={{ color: 'red' }}>Este campo é obrigatório</p>}

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

  return null;
}