import React, { useState, useEffect } from 'react'
import { userService } from '../services/userService'
import { communityService } from '../services/communityService'
import { postService } from '../services/postService'
import { eventService } from '../services/eventService'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Admin = () => {
  const [selectedTable, setSelectedTable] = useState('users')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const tables = [
    { value: 'users', label: 'Users' },
    { value: 'communities', label: 'Communities' },
    { value: 'posts', label: 'Posts' },
    { value: 'events', label: 'Events' }
  ]

  useEffect(() => {
    loadTableData()
  }, [selectedTable])

  const loadTableData = async () => {
    try {
      setLoading(true)
      let response
      
      switch (selectedTable) {
        case 'users':
          response = await userService.getAllUsers()
          break
        case 'communities':
          response = await communityService.getAllCommunities()
          break
        case 'posts':
          // This would need to be implemented in the backend
          response = [] // await postService.getAllPosts()
          break
        case 'events':
          response = await eventService.getAllEvents()
          break
        default:
          response = []
      }
      
      setData(response)
    } catch (error) {
      console.error('Error loading data:', error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingId(item[`${selectedTable.slice(0, -1)}_id`])
    setEditForm(item)
  }

  const handleSave = async () => {
    try {
      switch (selectedTable) {
        case 'users':
          await userService.updateUser(editingId, editForm)
          break
        case 'communities':
          await communityService.updateCommunity(editingId, editForm)
          break
        // Add cases for posts and events when backend is ready
      }
      
      setEditingId(null)
      setEditForm({})
      loadTableData() // Reload data
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        switch (selectedTable) {
          case 'users':
            await userService.deleteUser(id)
            break
          case 'communities':
            await communityService.deleteCommunity(id)
            break
          // Add cases for posts and events when backend is ready
        }
        
        loadTableData() // Reload data
      } catch (error) {
        console.error('Error deleting data:', error)
      }
    }
  }

  const handleInputChange = (field, value) => {
    setEditForm({
      ...editForm,
      [field]: value
    })
  }

  const renderTableHeaders = () => {
    if (!data.length) return null
    
    const sampleItem = data[0]
    return Object.keys(sampleItem).map(key => (
      <th key={key}>{key}</th>
    ))
  }

  const renderTableRows = () => {
    return data.map(item => {
      const idKey = `${selectedTable.slice(0, -1)}_id`
      const isEditing = editingId === item[idKey]
      
      return (
        <tr key={item[idKey]}>
          {Object.entries(item).map(([key, value]) => (
            <td key={key}>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="admin-input"
                />
              ) : (
                String(value)
              )}
            </td>
          ))}
          <td className="actions">
            {isEditing ? (
              <>
                <button className="btn btn-success btn-sm" onClick={handleSave}>
                  Save
                </button>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item[idKey])}
                >
                  Delete
                </button>
              </>
            )}
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-controls">
          <select 
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="form-select"
          >
            {tables.map(table => (
              <option key={table.value} value={table.value}>
                {table.label}
              </option>
            ))}
          </select>
          
          <button 
            className="btn btn-secondary"
            onClick={loadTableData}
            disabled={loading}
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  {renderTableHeaders()}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderTableRows()}
              </tbody>
            </table>
            
            {data.length === 0 && (
              <div className="empty-state">
                <p>No data found for {selectedTable}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin