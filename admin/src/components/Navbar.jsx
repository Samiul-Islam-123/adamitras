import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
  const adminLinks = [
    { name: "My Blogs", path: "/my-blogs" },
    { name: "Create Blog", path: "/create-blog" },
    { name: "Profile", path: "/profile" },
    { name: "Moderators", path: "/moderators" },
  ];

  const moderatorLinks = [
    { name: "Blogs", path: "/blogs" },
    { name: "Create Blog", path: "/create-blog" },
    { name: "Profile", path: "/profile" },
  ];

  const links = role === "moderator" ? adminLinks : moderatorLinks;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {role === "admin" ? (<>Admin</>) : (<>Moderator</>)}
        </Typography>
        <Box>
          {links.map((link) => (
            <Button key={link.path} color="inherit" component={Link} to={link.path}>
              {link.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
