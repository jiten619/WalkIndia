import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
});

const PrivacyPolicyScreen = () => {
  return (
    
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.text}>
        Welcome to Walking India ("Walking India," "we," "us" or "our"). If you continue to use Walking India, it indicates
        that you agree to our Privacy Policy.
      </Text>
      <Text style={styles.text}>
        Our Privacy Policy applies to all visitors, users, and others who access the Service ("Users").
      </Text>
      <Text style={styles.text}>
        Our Privacy Policy explains how we and some of the companies we work with collect, use, share and protect
        information in relation to our mobile services, web site, and any software provided on or in connection with Walking
        India services (collectively, the "Service"), and your choices about the collection and use of your information. We
        undertake to build the Service and any of its features in such a way that it respects your privacy and allow you not
        only to understand what we do with your personal information, but also manage your data effectively.
      </Text>
      {/* Render the rest of the Privacy Policy text here */}
      <Text style={styles.header}>1. THE INFORMATION WE COLLECT</Text>
      <Text style={styles.text}>
      When you use one of Walking India’s products or services, we (or our service providers or other vendors we engage to perform services on our behalf) collect the following categories of information from or about you:
      </Text>
      <Text style={styles.text}>
      We collect Location Information. To help you personalize your local experience, we may ask for your location information. We may collect information that identifies your device’s precise location (for example, GPS latitude and longitude level). We also collect information about your general location, using your zip code or postcode and IP address.
      </Text>
      <Text style={styles.text}>
      We collect Device, Internet and Network Activity Information. So that we can make your experience better, we collect information about how you interact with our apps. This includes what areas of the page you visit, for how long, and what content you view, and interact with. If you use our applications, we may collect information about the device you are using, operating system, device identifiers, and your IP address. We may also collect information about what applications you are using to have you launch the application which you want to share the content with. We also receive some other information automatically when you use our application. We may also look at how often you use the app and where you downloaded it. When you use our apps we may also collect operating system-provided device IDs or user-specific advertising IDs for advertisement tracking.
      </Text>
      <Text style={styles.text}>
      We collect Analytics Information. We use third-party analytics tools to help us measure traffic and usage trends for the Service. These tools collect information sent by your device or our Service, including the interfaces you use, add-ons, and other information that assists us in improving the Service. We collect and use this analytics information with analytics information from other Users so that it cannot reasonably be used to identify any particular individual User.
      </Text>
      <Text style={styles.text}>
      We collect Device identifiers. When you use a mobile device like a tablet or phone to access our Service, we may access, collect, monitor, store on your device, and/or remotely store one or more "device identifiers." Device identifiers are small data files or similar data structures stored on or associated with your mobile device, which uniquely identify your mobile device. A device identifier may be data stored in connection with the device hardware, data stored in connection with the device's operating system or other software, or data sent to the device by Walking India.
      </Text>
      <Text style={styles.text}>
      A device identifier may deliver information to us or to a third party partner about how you browse and use the Service and may help us or others provide reports or personalized content and ads. Some features of the Service may not function properly if use or availability of device identifiers is impaired or disabled.
      </Text>
      <Text style={styles.text}>
      Among others we collect the following device identifiers:
      </Text>
      <Text style={styles.text}>
      User Device ID Platform (iOS/Android) Device OS Version App Version First request time Language Region/Country Timezone Model App Version Metadata.
      </Text>
      <Text style={styles.text}>
      If the information covered by this Section is aggregated or de-identified so it is no longer reasonably associated with an identified or identifiable natural person, we may use it for any business purpose. To the extent information covered by this Section is associated with an identified or identifiable natural person and is protected as personal data under applicable data protection laws, it is referred to in this Privacy Policy as "Personal Data." We use pseudonymization for particular types of Personal Data to ensure better security of your Personal Data.
      </Text>

      <Text style={styles.header}>2. HOW WE USE YOUR INFORMATION AND PERSONAL DATA</Text>
       
      <Text style={styles.text}>
      In addition to some of the specific uses of information we describe in this Privacy Policy, we may use information that we receive (including Personal Data) for the following purposes:
      </Text>
      <Text style={styles.text}>
      to provide personalized content and information to you and others, which could include online ads or other forms of marketing; to provide, improve, test, and monitor the effectiveness of our Service; to develop and test new products and features; to monitor metrics such as total number of visitors, traffic, and demographic patterns (including via third party services as specified in Section 4 of this Privacy Policy); to diagnose or fix technology problems; to automatically update the Walking India application on your device; to send you technical notices, updates, security alerts and support and administrative messages; to link or combine with information we get from others or (and) from you to help understand your needs and provide you with better service (to use in training of neural networks, artificial intelligence, as well as for any other automated decision-making processing); for any other purposes disclosed to you at the time we collect Personal Data or indicated in this Privacy Policy. We will not process your Personal Data in a way that is incompatible with the purposes for which it has been collected or subsequently authorized by you in accordance with Section 2 of this Privacy Policy or collect any Personal Data that is not required for the mentioned purposes ("purpose limitation principle"). For any new purpose of processing we will ask your separate consent. To the extent necessary for those purposes, we take all reasonable steps to ensure that Personal Data is reliable for its intended use, accurate, complete, and current. We also undertake to collect only such amount and types of Persona Data that are strictly required for the purposes mentioned in this Section of the Privacy Policy ("data minimization principle").
      </Text>
       
      <Text style={styles.header}>3. SHARING OF YOUR PERSONAL DATA</Text>

      <Text style={styles.text}>
      We will not rent or sell your Personal Data to third parties outside Walking India (or the group of companies of which Walking India is a part) without your consent, except as Parties with whom we may share your information in accordance with this Policy.
      </Text>
      <Text style={styles.text}>
      Parties with whom we may share your Personal Data. We may share your Personal Data (including but not limited to, information from cookies, log files, device identifiers, location data, and usage data) with businesses that are legally part of the same group of companies that Walking India is part of, or that become part of that group ("Affiliates"). Affiliates may use this information to help provide, understand, and improve the Service (including by providing analytics) and Affiliates' own services (including by providing you with better and more relevant experiences). But these Affiliates will honor the choices you make about who can see your photos and are bound by the rules of this Privacy Policy.
      </Text>
      <Text style={styles.text}>
      We also may share your Personal Data as well as information from tools like cookies, log files, and device identifiers and location data, with third-party organizations that help us provide the Service to you ("Service Providers"). Our Service Providers will be given access to your Personal Data as is reasonably and appropriately necessary to provide the Service under reasonable confidentiality and data protection terms.
      </Text>
      <Text style={styles.text}>
      We may also share certain Personal data and information such as cookie data with third-party advertising partners. This information would allow third-party ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you.
      </Text>
      <Text style={styles.text}>
      We may remove parts of data that can identify you and share anonymized data with other parties.
      </Text>
      <Text style={styles.text}>
      The parties we share your Personal Data with are either EU-based or compliant with the EU-US Privacy Shield Framework that ensures that European data privacy requirement are met. We also utilize standard contractual clauses and other contractual safeguards in order to protect your privacy and insure that all transfers of your Personal Data are safe and compliant with applicable laws.
      </Text>
      <Text style={styles.text}>
      We may also combine your information (including Personal Data) with other information in a way that it is no longer associated with you and share that aggregated information.
      </Text>
      <Text style={styles.text}>
      What happens in the event of a change of control. If we sell or otherwise transfer part or the whole of Walking India or our assets to another organization (e.g., in the course of a transaction like a merger, acquisition, bankruptcy, dissolution, liquidation), your information such as any other information collected through the Service may be among the items sold or transferred. The buyer or transferee will have to honor the commitments we have made in this Privacy Policy.
      </Text>
      <Text style={styles.text}>
      Responding to legal requests and preventing harm. We may access, preserve and share your information in response to a legal request (like a search warrant, court order or subpoena) if we have a good faith belief that the law requires us to do so. This may include responding to legal requests from jurisdictions outside of the United States where we have a good faith belief that the response is required by law in that jurisdiction, affects users in that jurisdiction, and is consistent with internationally recognized standards. We may also access, preserve and share information when we have a good faith belief it is necessary to: detect, prevent and address fraud and other illegal activity; to protect ourselves, you and others, including as part of investigations; and to prevent death or imminent bodily harm. Information we receive about you may be accessed, processed and retained for an extended period of time when it is the subject of a legal request or obligation, governmental investigation, or investigations concerning possible violations of our terms or policies, or otherwise to prevent harm.
      </Text>

      <Text style={styles.header}>4. HOW WE STORE, PROCESS AND TRANSFER YOUR PERSONAL DATA</Text>

      <Text style={styles.text}>
      Data Storage and Processing. Your information collected through the Service may be stored and processed in any country in which Walking India, its Affiliates or Service Providers (processors) maintain facilities.
      </Text>
      <Text style={styles.text}>
      Walking India, its Affiliates, or Service Providers may transfer information that we collect about you, including personal information across borders and from your country or jurisdiction to other countries or jurisdictions around the world. If you are located in the European Union or other regions with laws governing data collection and use that may differ from U.S. law, please note that we may transfer information, including personal information, to a country and jurisdiction that does not have the same data protection laws as your jurisdiction. Our storage providers and processors in the United States self-certified under the Privacy Shield program and we utilize standard data protection clauses in order to transfer your Personal Data safely and in full compliance with the applicable law.
      </Text>
      <Text style={styles.text}>
      We process your Personal Data in a way that is compatible with and relevant for the purpose for which it was collected. To the extent necessary for those purposes, we take reasonable and appropriate steps to ensure that any information in our care is accurate, complete, current and reliable for its intended use.
      </Text>
      <Text style={styles.text}>
      Data security. We use reasonable and appropriate information security safeguards to help keep the information collected through the Service secure and take reasonable steps (such as requesting a unique password) to verify your identity before granting you access to your account. However, Walking India cannot ensure the absolute security of any information you transmit to the Service or an absolute guarantee that information on the Service may not be accessed, disclosed, altered, or destroyed. Please understand that there is no ideal technology or measure to maintain 100 % security. Among others, we utilize the following information security measures:
      </Text>
      <Text style={styles.text}>
      Pseudominization of certain categories of your Personal Data; Encryption of your Personal Data in transit and in rest; Systematic vulnerability scanning and penetration testing; Organizational and legal measures; Conducting periodical data protection impact assessments in order to ensure that the Service fully adheres to the principles of 'privacy by design', 'privacy by default' and others. We also commit to undertake privacy audit in case of Company's merger or takeover. All information that you provide to us through the App is automatically uploaded to our servers and is stored there in duplicate to the information stored on your device.
      </Text>

      <Text style={styles.header}>1. HOW TO DELETE YOUR PERSONAL DATA</Text>

      <Text style={styles.text}>
      You have the right to request the deletion of Your Personal Data, subject to certain exceptions. Once We receive and confirm Your request, We will delete (and direct Our Service Providers to delete) Your personal information from our records, unless an exception applies. you can request the deletion of Your Personal Data by email or feedback in the application.
      </Text>

      <Text style={styles.header}>2. CHILDREN'S PRIVACY</Text>

      <Text style={styles.text}>
      General age limitation. Walking India does not knowingly collect or solicit any information from anyone under the age of 13. The Service and its content are not directed at children under the age of 13. In the event that we learn that we have collected personal information from a child under age 13 without parental consent, we will delete that information as quickly as possible. If you believe that we might have any information from or about a child under 13, please contact us.
      </Text>
      <Text style={styles.text}>
      Age limitation for EU residents. Due to requirements of the GDPR you shall be at least 16 years old in order to use the Service. To the extent prohibited by applicable law, we do not allow use of the Service by the EU residents younger than 16 years old. If you are aware of anyone younger than 16 using the Service, please contact us and we will take required steps to delete such information.
      </Text>

      <Text style={styles.header}>3. LINKS TO OTHER WEBSITES AND SERVICES</Text>

      <Text style={styles.text}>
      We are not responsible for the practices employed by websites or services linked to or from the Service, including the information or content contained therein. Please remember that when you use a link to go from the Service to another website, our Privacy Policy does not apply to third-party websites or services. Your browsing and interaction on any third-party website or service, including those that have a link on our website, are subject to that third party's own rules and policies. In addition, you agree that we are not responsible and we do not exercise control over any third-parties that you authorize to access your User Content. If you are using a third party website or service (like Facebook or Twitter) and you allow such a third party access to your User Content, you do so at your own risk. This Privacy Policy does not apply to information we collect by other means (including offline) and from other sources other than through the Service.
      </Text>

      <Text style={styles.header}>4. HOW TO CONTACT US</Text>

      <Text style={styles.text}>
      If you have any questions about this Privacy Policy or the Service, please contact us at jitenvyas619@gmail.com
      </Text>

      <Text style={styles.header}>5. CHANGES TO OUR PRIVACY POLICY</Text>

      <Text style={styles.text}>
      Walking India may modify or update this Privacy Policy from time to time, so please review it periodically. We may provide you additional forms of notice of modifications or updates as appropriate under the circumstances. Your continued use of Walking India or the Service after any modification to this Privacy Policy will constitute your acceptance of such modification. In some cases, we may require you to expressly accept new Privacy Policy in order to continue using our Service (for example if we expand types of Personal Data collected from you or introduce new purposes of collection and processing).
      </Text>
      <Text style={styles.text}>
      This Privacy Policy was last modified on August 01, 2022
      </Text>

      </ScrollView>
    </View>
    
  );
};

export default PrivacyPolicyScreen;