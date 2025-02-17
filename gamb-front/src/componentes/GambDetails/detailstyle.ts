import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  display: flex;
  gap: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  min-width: 300px;
`;

export const CardContentPeople = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--gray-placeholders, #C3C3C3);
  padding: 15px 10px 10px 10px;
  border-radius: 8px;
  width: 15%;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid var(--gray-placeholders, #C3C3C3);
  padding: 15px 10px 10px 15px;
  border-radius: 8px;
  width: 85%;
`;

export const Section = styled.div`
  margin-bottom: 15px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
`;

export const PeopleList = styled.div`
  margin-top: 10px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 5px 0;
  }
`;