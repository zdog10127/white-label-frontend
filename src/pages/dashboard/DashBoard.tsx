import React from "react";
import { LayoutBasePage } from "../../shared/layouts";
import ToolsDetails from "../../components/tools-details/ToolsDetails";

export const Dashboard = () => {
  return (
    <LayoutBasePage title="White Label" toolsBar={<ToolsDetails />}>
      teste
    </LayoutBasePage>
  );
};

const DashboardPanel: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="left-column">
        <div className="card">
          <h2>Próximas sessões</h2>
          <div className="card-content center">
            <div>
              <p className="bold">Você ainda não cadastrou nenhuma sessão.</p>
              <p>
                No momento, não há nenhuma sessão agendada. Registre uma sessão
                acessando o módulo Agenda.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="tabs">
            <button className="active-tab">Pendências (0)</button>
            <button>Atividade de clientes (0)</button>
            <button>Aniversariantes do mês</button>
          </div>
          <div className="card-content center">
            <div>
              <img
                src="/robot-placeholder.svg"
                alt="Placeholder"
                className="placeholder-img"
              />
              <p className="bold">
                Opss! Ainda não existem registros para mostrar aqui.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-column">
        <div className="card">
          <div className="tabs">
            <button className="active-tab">Relatório financeiro</button>
            <button>Psicobank</button>
          </div>
          <div className="finance-box">
            <div className="finance-row">
              <span>Saldo bloqueado</span>
              <span className="yellow">R$ 0,00</span>
            </div>
            <div className="finance-row">
              <span>Saldo disponível para saque</span>
              <span className="blue">R$ 0,00</span>
            </div>
            <button className="withdraw-btn">Sacar</button>
            <hr />
            <div className="finance-details">
              <h3>Recebimentos do mês</h3>
              <ul>
                <li>
                  <span>Cartão de crédito</span>
                  <span>R$ 0,00</span>
                </li>
                <li>
                  <span>Boleto bancário</span>
                  <span>R$ 0,00</span>
                </li>
                <li>
                  <span>Pix</span>
                  <span>R$ 0,00</span>
                </li>
              </ul>
              <div className="total">
                <span>Total</span>
                <span>R$ 0,00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Tarefas</h2>
          <button className="new-task">+ Criar uma nova tarefa</button>
          <div className="card-content center">
            <div>
              <img
                src="/robot-placeholder.svg"
                alt="Placeholder"
                className="placeholder-img"
              />
              <p className="bold">
                Opss! Ainda não existe nenhuma tarefa cadastrada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
