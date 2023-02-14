import { Table } from '@mantine/core';

const elements = [
    { position: 6, title: 'Gottes Dients', url: 'https://youtube.com', date: '20/20/23', action: 'public', edit: 'edit', delete: 'delete' },
    { position: 6, title: 'Gottes Dients', url: 'https://youtube.com', date: '20/20/23', action: 'public', edit: 'edit', delete: 'delete' },

  ];


 export default function Tables() {
    const rows = elements.map((element) => (
      <tr key={element.title}>
        <td>{element.title}</td>
        <td>{element.url}</td>
        <td>{element.date}</td>
        <td>{element.action}</td>
        <td>{element.edit}</td>
        <td>{element.delete}</td>
      </tr>
    ));
  
    return (
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Date</th>
            <th>Public / Private</th>
            <th>edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }