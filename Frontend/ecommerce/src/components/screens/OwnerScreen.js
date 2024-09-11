import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const OwnerScreen = () => {
  const [codDetails, setCodDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editDetails, setEditDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cod-details/')
      .then(response => {
        setCodDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    const detail = codDetails.find(d => d.id === id);
    setEditId(id);
    setEditDetails(detail);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/cod-details/?id=${editId}`, editDetails);
      setCodDetails(codDetails.map(item => (item.id === editId ? { ...item, ...editDetails } : item)));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating COD details:', error);
      alert('Failed to update COD details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails({ ...editDetails, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cod-details/?id=${id}`);
      setCodDetails(codDetails.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting COD details:', error);
      alert('Failed to delete COD details');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>COD Details</h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          margin: '0 auto',
          backgroundColor: '#fff'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left', borderRight: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left', borderRight: '1px solid #ddd' }}>Phone</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left', borderRight: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Address</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {codDetails.map((detail, index) => (
              <tr key={detail.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', color: '#333' }}>{detail.name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', color: '#333' }}>{detail.phone}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', color: '#333' }}>{detail.email}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd', color: '#333' }}>{detail.address}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  <Button variant="warning" onClick={() => handleEdit(detail.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(detail.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit COD Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={editDetails.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="editPhone" className="my-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="phone"
                value={editDetails.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="editEmail" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editDetails.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="editAddress" className="my-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter address"
                name="address"
                value={editDetails.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OwnerScreen;
