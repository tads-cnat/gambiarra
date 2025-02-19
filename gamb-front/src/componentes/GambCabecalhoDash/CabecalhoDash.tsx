 
import {
  CabecalhoDashContainer,
  CabecalhoDashWrapper,
} from "./cabecalhoDashstyle";
import Breadcrumb from "../GambBreadCrumb/Breadcrumb";
import Notificacao from "../GambNotificao/Notificacao";

export default function CabecalhoDash() {

  return (
    <CabecalhoDashContainer>
      <CabecalhoDashWrapper>
        <Breadcrumb crumbs={[
            { label: "Dashboard", href: "/dashboard" },
        ]}/>
        <div className="flex gap-2">
        <Notificacao icon={"chat"} backgroundColor= "#98CDFF" size={30} badgeNumber={0} />
        <Notificacao icon={"bellringing"} backgroundColor= "#FBD870" size={30} badgeNumber={3} />
        </div>
      </CabecalhoDashWrapper>
    </CabecalhoDashContainer>
  );
}
