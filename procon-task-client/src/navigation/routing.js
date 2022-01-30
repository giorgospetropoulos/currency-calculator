import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Add, Currency, Edit, Homepage, Login, Register } from '../Pages'

class Routing extends Component {
    state = {}
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/:code" element={<Currency />} />
                    <Route path="/edit/:code" element={<Edit />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Routing
