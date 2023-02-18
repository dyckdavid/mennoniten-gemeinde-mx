import { Table } from '@mantine/core';

const elements = [
    { position: 6, title: 'Gottes Dients', url: 'https://youtube.com', date: '20/20/23', action: 'public', edit: 'edit', delete: 'delete' },
    { position: 6, title: 'Gottes Dients', url: 'https://youtube.com', date: '20/20/23', action: 'public', edit: 'edit', delete: 'delete' },

  ];


 export default function Tables() {
      <tr >
        <td>Gottes Dients</td>
        <td>https://youtube.com</td>
        <td>20/20/23</td>
        <td>public</td>
        <td>edit</td>
        <td>delete</td>
      </tr>
    
  
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
        
      </Table>
    );
  }