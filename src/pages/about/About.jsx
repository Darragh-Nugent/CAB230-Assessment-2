import React from "react";

import { Box, Typography, Card, CardContent, Container } from "@mui/material";

import AboutImg from "../../../assets/about.jpg"

export default function About() {
  return (
    <Box sx={{ bgcolor: 'custom.backgroundLight', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          About Us
        </Typography>

        <Box
          component="img"
          src={AboutImg}
          alt="Image of deal in front of property"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 3,
          }}
        >
        </Box>

        <Card sx={{
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'custom.card',
        }}>
          <CardContent>
            <Typography variant="body1" color="text.primary">
              For over 45 months, High Rise has been a staple in the rental market scene. Rising like a phoenix from the ashes of Rentals-R-us
              (for legal reasons we have no formal relation to Rentals-R-Us nor to anyone currently involved in the investigation into Rentals-R-Us),
              High Rise has grown suspiciously quickly become a key player in properties across the country.
              <br /><br />
              We deal in all rentals, from multi-storey apartments, to shacks you can't quite stand upright in. Our wide range and diverse location will suit anyone's needs.
              New families, old families, older families who are still figuring out the will can all find a new home to sit down, relax, and argue over legal documents.
              <br /><br />

              Don't believe us? Here is what some of our clients had to say:
              <br /><br /><br />
            </Typography>

            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                “The property was pretty good. Cosy. At least until the rats finally caved in the roof!”
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'right' }}>
                - Ian, Previously in Loganhome
              </Typography>
              <br />
            </Box>

            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                “Can't wait until I get another rental with them. As in, I have a week left where I currently am before I am out on the street.”
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'right' }}>
                - Sarah, Previously in Carlton, now in [unknown]
              </Typography>
              <br />
            </Box>

            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                “High Rise, I thought I was with Rentals-R-Us?”
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'right' }}>
                - Greg, Currently at St Leonards
              </Typography>
              <br />
            </Box>

            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                “Yeah, nah.”
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'right' }}>
                - Anonymous
              </Typography>
              <br />

            </Box>

            <Typography variant="body1" color="text.primary">
              <br />
              So, what are you waiting for? Come find your dream home for the next few weeks today!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
