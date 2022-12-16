import { useState } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import {OutlinedInput, Box, Button} from '@mui/material';
import axios from 'axios'

export default function CommentForm(props) {
    const venueID = props.venueID
    const [ commentInput, setCommentInput ] = useState('')
    const userName = window.sessionStorage.getItem("username")

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:4000/comment/api/comment/${venueID}`, {
            username: userName,
            content: commentInput,
        }).then((res) => console.log(res))
            .catch((err) => console.log(err))
        window.location.reload()

    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{m: 5}}
            onSubmit={handleCommentSubmit}
        >
            <FormControl sx={{ diplay:"flex", width: '75vw' }}>
                <OutlinedInput
                    value={commentInput}
                    onInput={(e) => setCommentInput(e.target.value)}
                    placeholder="Please enter your comment"
                />
                <Button type="submit" variant="contained" sx={{width: "8rem", mt: 2, ml: "90%"}}>Submit</Button>
            </FormControl>
        </Box>
    );
}