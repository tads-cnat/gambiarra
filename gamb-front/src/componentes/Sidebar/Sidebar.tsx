import { AddressBook, FileText, FolderUser } from "@phosphor-icons/react";
import {
	SidebarBody,
	SidebarContainer,
	SidebarContent,
	User,
	UserSpace,
} from "./sidebarstyles";
import GambButton from "../GambButton/Button";
import { useState } from "react";
import { ChamadoSubmit } from "../../interfaces/models/iChamado";
import ModalChamadoSubmit from "./forms/abrirChamado/ModalChamadoSubmit";
import ChamadoService from "../../services/models/ChamadoService";
import React from "react";

export function Sidebar() {
	const [ModalOpen, setModalOpen] = useState(false);

	const closeModal = () => setModalOpen(false);

	async function onSubmit(data: ChamadoSubmit): Promise<void> {
		console.log(data);
		ChamadoService.criarChamado(data)
			.then((response) => {
				console.log(response);
				alert("Chamado criado com sucesso");
			})
			.catch(() => {
				alert("Erro ao criar chamado");
			})
			.finally(() => {
				window.location.reload();
			});

		setModalOpen(false);
	}
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [isSubDropdownOpen, setSubDropdownOpen] = useState(false);

	const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
	const toggleSubDropdown = () => setSubDropdownOpen(!isSubDropdownOpen);

	return (
		<>
			<SidebarBody>
				<SidebarContainer>
					<SidebarContent>
						<div>
							<img
								src="\assets\gambi.png"
								alt=""
								className="gambi-img"
							/>
							<div className="buttons-conj flex items-end">
								<GambButton
									variant="verde"
									label="Chamados"
									icon="seta_direita"
								/>
								<GambButton
									variant="roxo"
									label="Abrir Chamado"
									icon="seta_direita"
									onClick={() => setModalOpen(true)}
								/>
							</div>

							<ul>
								<li>
									<a href="#">
										<FolderUser /> Gerenciar bolsista
									</a>
								</li>
								<li>
									<a href="#">
										<FileText /> Gerar ordem de serviço
									</a>
								</li>
								<li>
									<a href="#">
										<AddressBook /> Gerar termo de
										responsabilidade
									</a>
								</li>
							</ul>
						</div>

						<UserSpace>
							<User>
								<img
									src="\assets\perfil.png"
									alt="Imagem de perfil"
								/>
								LiviaVS
							</User>
							<GambButton
								id="multiLevelDropdownButton"
								type="button"
								variant="circle"
								label=""
								icon="list"
								size="large"
								onClick={toggleDropdown}
							/>
							{isDropdownOpen && (
								<div>
									{/* Dropdown Menu */}
									{isDropdownOpen && (
										<div
											id="multi-dropdown"
											className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
										>
											<ul
												className="py-2 text-sm text-gray-700"
												aria-labelledby="multiLevelDropdownButton"
											>
												<li>
													<a
														href="#"
														className="block px-4 py-2 hover:bg-gray-100"
													>
														Dashboard
													</a>
												</li>
												<li>
													<button
														id="doubleDropdownButton"
														onClick={
															toggleSubDropdown
														}
														type="button"
														className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
													>
														Dropdown
														<svg
															className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 6 10"
														>
															<path
																stroke="currentColor"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="m1 9 4-4-4-4"
															/>
														</svg>
													</button>
													{isSubDropdownOpen && (
														<div
															id="doubleDropdown"
															className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
														>
															<ul
																className="py-2 text-sm text-gray-700"
																aria-labelledby="doubleDropdownButton"
															>
																<li>
																	<a
																		href="#"
																		className="block px-4 py-2 hover:bg-gray-100"
																	>
																		Overview
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		className="block px-4 py-2 hover:bg-gray-100"
																	>
																		My
																		downloads
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		className="block px-4 py-2 hover:bg-gray-100"
																	>
																		Billing
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		className="block px-4 py-2 hover:bg-gray-100"
																	>
																		Rewards
																	</a>
																</li>
															</ul>
														</div>
													)}
												</li>
												<li>
													<a
														href="#"
														className="block px-4 py-2 hover:bg-gray-100"
													>
														Earnings
													</a>
												</li>
												<li>
													<a
														href="#"
														className="block px-4 py-2 hover:bg-gray-100"
													>
														Sign out
													</a>
												</li>
											</ul>
										</div>
									)}
								</div>
							)}
						</UserSpace>
					</SidebarContent>
				</SidebarContainer>
			</SidebarBody>
			<ModalChamadoSubmit
				isModalOpen={ModalOpen}
				closeModal={closeModal}
				onSubmit={onSubmit}
			/>
		</>
	);
}
