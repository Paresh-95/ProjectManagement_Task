import React, { useState } from "react";
export default function AddPeopleAttachment({
    isOpen = false,
    onClose = () => { },
    onSubmit = (email) => { }
}) {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        onSubmit(email);
        setEmail("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2 style={styles.title}>Add people to the board</h2>
                <input
                    type="email"
                    placeholder="Enter the email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.buttonGroup}>
                    <button
                        style={{ ...styles.button, ...styles.cancelButton }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        style={{ ...styles.button, ...styles.addButton }}
                        onClick={handleSubmit}
                    >
                        Add Email
                    </button>
                </div>
            </div>
        </div>
    );
} const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '420px',
        width: '100%',
    },
    title: {
        fontFamily: 'Noto Sans',
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '27.24px',
        textAlign: 'left',
        marginBottom: '2rem',
    },
    input: {
        width: '394px',
        height: '25px',
        padding: '0.6rem',
        border: '1px solid #ccc',
        borderRadius: '10px',
        marginBottom: '2rem',
    },
    buttonGroup: {
        display: 'flex',
        gap: '0.5rem',
    },
    button: {
        flex: 1,
        padding: '0.5rem',
        height: '40px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontFamily: 'Poppins',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: '19px',
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: '#ffffff',
        color: '#CF3636',
        border: '1px solid #CF3636',

    },
    addButton: {
        backgroundColor: '#17A2B8',
        color: 'white',
        border: 'none',
    },
};